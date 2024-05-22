package com.glanceexample;
import static com.glanceexample.Constants.*;
import android.content.Intent;
import android.graphics.Point;
import android.util.Log;
import android.view.View;
import android.text.TextUtils;

import androidx.annotation.IntDef;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.util.ReactFindViewUtil;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import net.glance.android.DisplayParams;
import net.glance.android.Event;
import net.glance.android.EventCode;
import net.glance.android.EventConstants;
import net.glance.android.EventType;
import net.glance.android.Settings;
import net.glance.android.StartParams;
import net.glance.android.VideoMode;
import net.glance.android.VisitorVideoSizeMode;
import net.glance.android.WidgetCorner;
import net.glance.android.WidgetVisibilityMode;
import net.glance.android.Glance;
import net.glance.android.GlanceOptions;
import net.glance.android.VisitorListener;
import net.glance.android.VisitorInitParams;
import net.glance.android.api.GlanceTimeout;
import net.glance.android.api.GlanceAttempts;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nonnull;

import static java.lang.Integer.parseInt;

public class GlanceBridge extends ReactContextBaseJavaModule implements VisitorListener, ReactFindViewUtil.OnMultipleViewsFoundListener {

    private static final String TAG = "GlanceRN";

    private static String defaultTermsUrl = "https://www.glance.cx";

    private VideoMode videoMode;
    private boolean startingSession = false;
    private boolean connectingViaPresence = false;
    private static boolean glanceSpeakerphoneEnabled;

    @Override
    public void onViewFound(View view, String nativeId) {
        Glance.addMaskedView(view, nativeId);
    }

    public GlanceBridge(ReactApplicationContext context) {
        super(context);

        final Set<String> nativeIds = new HashSet<>();
        nativeIds.add("masked");
        ReactFindViewUtil.addViewsListener(this, nativeIds);
    }

    @Nonnull
    @Override
    public String getName() {
        return "GlanceBridge";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        Constants c = new Constants();
        for (Field f : Constants.class.getFields()) {
            try {
                constants.put(f.getName(), f.get(c));
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }

        for (VideoMode mode : VideoMode.values()) {
            constants.put(mode.name(), mode.getValue());
        }

        EventCode ft = EventCode.EventActionsChange; // getting any just to get the reference later
        Class ftClass = ft.getClass();
        for (Field f : ftClass.getFields()) {
            constants.put(f.getName(), f.getName());
        }

        return constants;
    }

    @ReactMethod
    private void getVersion(Callback callback) {
        GlanceOptions.init(getCurrentActivity());

        Log.d(TAG, new Settings().Get(SDK_VERSION_MAP_KEY));
        callback.invoke(null, new Settings().Get(SDK_VERSION_MAP_KEY));
    }

    @ReactMethod
    private boolean isRunning() {
        return true;
    }

    // VISITOR CALLS -------------------------------------

    // Due to the RN method overloading limitation, we need to create a single @ReactMethod for each repetitive signature in our Glance class
    // and figure out which variation to use based on the pre-defined method number passed inside the map (in our case, through the property "methodVariation").
    // Also, we have typing limitation, so we can't use our classes directly. See https://reactnative.dev/docs/native-modules-android#argument-types.
    @ReactMethod
    private void init(ReadableMap initParamsMap) {
        VisitorInitParams params = parseVisitorInitParams(initParamsMap);
        GlanceTimeout glanceTimeout = initParamsMap.hasKey(GLANCE_TIMEOUT_MAP_KEY) && !initParamsMap.isNull(GLANCE_TIMEOUT_MAP_KEY) ? new GlanceTimeout(initParamsMap.getInt(GLANCE_TIMEOUT_MAP_KEY)) : null;
        GlanceAttempts glanceAttempts = initParamsMap.hasKey(GLANCE_ATTEMPTS_MAP_KEY) && !initParamsMap.isNull(GLANCE_ATTEMPTS_MAP_KEY) ? new GlanceAttempts(initParamsMap.getInt(GLANCE_ATTEMPTS_MAP_KEY)) : null;

        int groupID = getMapInt(initParamsMap, GROUP_ID_MAP_KEY, 0);
        String visitorID = getMapString(initParamsMap, VISITOR_ID_MAP_KEY, null);
        String glanceServer = getMapString(initParamsMap, GLANCE_SERVER_MAP_KEY, "www.glance.net");
        String token = getMapString(initParamsMap, TOKEN_MAP_KEY, "");
        String name = getMapString(initParamsMap, NAME_MAP_KEY, "");
        String email = getMapString(initParamsMap, EMAIL_MAP_KEY, "");
        String phone = getMapString(initParamsMap, PHONE_MAP_KEY, "");

        switch (initParamsMap.getInt(METHOD_VARIATION_MAP_KEY)) {
            case 1:
                init(params);
                break;
            case 2:
                init(params, glanceTimeout);
                break;
            case 3:
                init(params, glanceAttempts);
                break;
            case 4:
                init(groupID, visitorID, this);
                break;
            case 5:
                init(groupID, visitorID, glanceTimeout, this);
                break;
            case 6:
                init(groupID, visitorID, glanceAttempts, this);
                break;
            case 7:
                init(groupID, visitorID, glanceServer, this);
                break;
            case 8:
                init(groupID, visitorID, glanceServer, glanceTimeout, this);
                break;
            case 9:
                init(groupID, visitorID, glanceServer, glanceAttempts, this);
                break;
            case 10:
                init(groupID, token, name, email, phone, visitorID, this);
                break;
            case 11:
                init(groupID, token, name, email, phone, visitorID, glanceTimeout, this);
                break;
            case 12:
                init(groupID, token, name, email, phone, visitorID, glanceAttempts, this);
                break;
            default:
                Log.e(TAG, "init() not called since the specific variation wasn't selected. Did you passed the variation number through the property 'methodVariation'?");
                break;
        }
    }

    // # 1
    private void init(VisitorInitParams initParams) {
        Glance.init(getCurrentActivity(), initParams, (GlanceTimeout) null);
    }

    // # 2
    private void init(VisitorInitParams initParams, GlanceTimeout glanceTimeout) {
        Glance.init(getCurrentActivity(), initParams, glanceTimeout);
    }

    // # 3
    private void init(VisitorInitParams initParams, GlanceAttempts glanceAttempts) {
        Glance.init(getCurrentActivity(), initParams, glanceAttempts);
    }

    // # 4
    private void init(int groupId, String visitorId, VisitorListener eventsListener) {
        Glance.init(getCurrentActivity(), groupId, visitorId, eventsListener);
    }

    // # 5
    private void init(int groupId, String visitorId, GlanceTimeout glanceTimeout, VisitorListener eventsListener) {
        Glance.init(getCurrentActivity(), groupId, visitorId, glanceTimeout, eventsListener);
    }

    // # 6
    private void init(int groupId, String visitorId, GlanceAttempts glanceAttempts, VisitorListener eventsListener) {
        Glance.init(getCurrentActivity(), groupId, visitorId, glanceAttempts, eventsListener);
    }

    // # 7
    private void init(int groupId, String visitorId, String glanceServer, VisitorListener eventsListener) {
        Glance.init(getCurrentActivity(), groupId, visitorId, glanceServer, eventsListener);
    }

    // # 8
    private void init(int groupId, String visitorId, String glanceServer, GlanceTimeout glanceTimeout, VisitorListener eventsListener) {
        Glance.init(getCurrentActivity(), groupId, visitorId, glanceServer, glanceTimeout, eventsListener);
    }

    // # 9
    private void init(int groupId, String visitorId, String glanceServer, GlanceAttempts glanceAttempts, VisitorListener eventsListener) {
        Glance.init(getCurrentActivity(), groupId, visitorId, glanceServer, glanceAttempts, eventsListener);
    }

    // # 10
    private void init(int groupId, String token, String name, String email, String phone, String visitorId, VisitorListener eventsListener) {
        Glance.init(getCurrentActivity(), groupId, token, name, email, phone, visitorId, eventsListener);
    }

    // # 11
    private void init(int groupId, String token, String name, String email, String phone, String visitorId, GlanceTimeout glanceTimeout,
                      VisitorListener eventsListener) {
        Glance.init(getCurrentActivity(), groupId, token, name, email, phone, visitorId, glanceTimeout, eventsListener);
    }

    // # 12
    private void init(int groupId, String token, String name, String email, String phone, String visitorId, GlanceAttempts glanceAttempt,
                      VisitorListener eventsListener) {
        Glance.init(getCurrentActivity(), groupId, token, name, email, phone, visitorId, glanceAttempt, eventsListener);
    }

    /**
     We don't need the following methods because we communicate the events through the ReactNative DeviceEventManagerModule.RCTDeviceEventEmitter emitter
     so the customer just need to unsubscribe it on the Javascript side if needed.

     - private void addVisitorListener(VisitorListener listener)
     - private void removeVisitorListener(VisitorListener listener)
     **/

    /**
     * The methods below are not supported for ReactNative since we'll always need to use the reactTag (which gets the View's ID internally) instead:
     * - void addMaskedView(View view, String label)
     * - void removeMaskedView(View view)
     **/

    @ReactMethod
    private void addMaskedViewId(Integer reactTag, String label, Promise promise) {
        if (reactTag == null || reactTag <= 0) {
            Log.w(TAG, String.format("Could not add mask for the label %s: invalid id - %d", label, reactTag));
            promise.resolve(-1);
            return;
        }

        UIManagerModule uiManager = getReactApplicationContext().getNativeModule(UIManagerModule.class);
        uiManager.prependUIBlock(nativeViewHierarchyManager -> {
            View view = nativeViewHierarchyManager.resolveView(reactTag);

            Integer id = view.getId();
            Glance.addMaskedViewId(id, label);

            Log.d(TAG, String.format("Added mask with ID == %d", id));

            promise.resolve(id); // send back the original View id to the Javascript level so the customer can use it to remove the mask later
        });
    }

    @ReactMethod
    private void removeMaskedViewId(Integer viewId) {
        if (viewId == null || viewId <= 0) {
            Log.d(TAG, String.format("Could not remove mask: invalid id - %d", viewId));
            return;
        }

        // We need to call it inside the UI block otherwise it won't take effect.
        UIManagerModule uiManager = getReactApplicationContext().getNativeModule(UIManagerModule.class);
        uiManager.prependUIBlock(nativeViewHierarchyManager -> {
            // this viewID should be the same returned by the @addMaskedViewId method, which is the native View id indeed     
            Glance.removeMaskedViewId(viewId);
        });
    }

    @ReactMethod
    private Integer getVisitorCallId() {
        // if it becomes a problem, we can try to use a ReadableMap instead and pass the pure value
        return Math.toIntExact(Glance.getVisitorCallId());
    }

    @ReactMethod
    private Boolean isInSession() {
        return Glance.isInSession();
    }

    @ReactMethod
    private Boolean isVideoAvailable() {
        return Glance.isVideoAvailable();
    }

    @ReactMethod
    private Boolean isAgentVideoEnabled() {
        return Glance.isAgentVideoEnabled();
    }

    @ReactMethod
    private void pause(Boolean isPaused) {
        Glance.pause(isPaused);
    }

    @ReactMethod
    private void togglePause() {
        Glance.togglePause();
    }

    @ReactMethod
    private void release() {
        Glance.release();
    }

    /**
     * onCaptureScreenPermissionSuccess() and onCaptureScreenPermissionFailure() methods are
     * called in the MainActivity since they need an interaction with the native side to work.
     **/

    @ReactMethod
    private void updateVisitorVideoSize(int width, int height, String stringMode) {
        VisitorVideoSizeMode mode = VisitorVideoSizeMode.getEnum(stringMode);
        Glance.updateVisitorVideoSize(width, height, mode);
    }

    @ReactMethod
    private void updateVisitorVideoStatus(boolean isPaused) {
        Glance.updateVisitorVideoStatus(isPaused);
    }

    @ReactMethod
    private void updateWidgetVisibility(String stringVisibility) {
        WidgetVisibilityMode mode = WidgetVisibilityMode.getEnum(stringVisibility);
        Glance.updateWidgetVisibility(mode);
    }

    @ReactMethod
    private void updateWidgetLocation(String stringVisibility) {
        WidgetCorner mode = WidgetCorner.fromServer(stringVisibility);
        Glance.updateWidgetLocation(mode);
    }

    @ReactMethod
    private void setUserState(String state, String value) {
        Glance.setUserState(state, value);
    }

    @ReactMethod
    private void sendUserMessage(String messageType, String value) {
        Glance.sendUserMessage(messageType, value);
    }

    // Here we have the same considerations as for the init() methods
    @ReactMethod
    private void startSession(ReadableMap startSessionParamsMap) {
        int groupID = getMapInt(startSessionParamsMap, GROUP_ID_MAP_KEY, 0);
        String sessionKey = getMapString(startSessionParamsMap, SESSION_KEY_MAP_KEY, "GLANCE_KEYTYPE_RANDOM");
        boolean maskKeyboard = getMapBoolean(startSessionParamsMap, MASK_KEYBOARD_MAP_KEY, true);

        StartParams params = parseStartParams(startSessionParamsMap, sessionKey);

        GlanceTimeout glanceTimeout = startSessionParamsMap.hasKey(GLANCE_TIMEOUT_MAP_KEY) ? new GlanceTimeout(startSessionParamsMap.getInt(GLANCE_TIMEOUT_MAP_KEY)) : null;
        GlanceAttempts glanceAttempts = startSessionParamsMap.hasKey(GLANCE_ATTEMPTS_MAP_KEY) ? new GlanceAttempts(startSessionParamsMap.getInt(GLANCE_ATTEMPTS_MAP_KEY)) : null;
        boolean skipDialog = !startSessionParamsMap.hasKey(SKIP_DIALOG_MAP_KEY) || startSessionParamsMap.getBoolean(SKIP_DIALOG_MAP_KEY);

        switch (startSessionParamsMap.getInt(METHOD_VARIATION_MAP_KEY)) {
            case 1:
                startSession(sessionKey);
                break;
            case 2:
                startSession(sessionKey, glanceTimeout);
                break;
            case 3:
                startSession(groupID, params, maskKeyboard);
                break;
            case 4:
                startSession(params, glanceTimeout);
                break;
            case 5:
                startSession(params, glanceAttempts);
                break;
            case 6:
                startSession(params, skipDialog);
                break;
            case 7:
                startSession(params, skipDialog, glanceTimeout);
                break;
            case 8:
                startSession(params, skipDialog, glanceAttempts);
                break;
            default:
                Log.e(TAG, "startSession() not called since the specific variation wasn't selected. Did you passed the variation number through the property 'methodVariation'?");
                break;
        }
    }

    // # 1
    private void startSession(String sessionKey) {
        Glance.startSession(sessionKey);
    }

    // # 2
    private void startSession(String sessionKey, GlanceTimeout glanceTimeout) {
        Glance.startSession(sessionKey, glanceTimeout);
    }

    // # 3
    private void startSession(int groupId, StartParams params, boolean maskKeyboard) {
        Glance.startSession(params);
    }

    // # 4
    private void startSession(StartParams params, GlanceTimeout glanceTimeout) {
        Glance.startSession(params, glanceTimeout);
    }

    // # 5
    private void startSession(StartParams params, GlanceAttempts glanceAttempts) {
        Glance.startSession(params, glanceAttempts);
    }

    // # 6
    private void startSession(StartParams params, boolean skipDialog) {
        Glance.startSession(params, skipDialog);
    }

    // # 7
    private void startSession(StartParams params, boolean skipDialog, GlanceTimeout glanceTimeout) {
        Glance.startSession(params, skipDialog, glanceTimeout);
    }

    // # 8
    private void startSession(StartParams params, boolean skipDialog, GlanceAttempts glanceAttempts) {
        Glance.startSession(params, skipDialog, glanceAttempts);
    }

    @ReactMethod
    private void endSession() {
        Glance.endSession();
    }

    /**
     * showAgentVideo(), hideAgentViewer(), getVisitorSessionDialogListener(), setSessionUIImplementation(), setCustomAgentVideoSessionViewId(),
     * and getSessionUIInstance() methods are SessionUI related which will not be used for this bridge (customers will need to implement their 
     * UI themselves).
     **/

    @ReactMethod
    private void addVisitorVideo(ReadableMap addVideoParamsMap) {
        VideoMode videoMode = addVideoParamsMap.hasKey(VIDEO_MODE_MAP_KEY) ? VideoMode.getEnum(addVideoParamsMap.getString(VIDEO_MODE_MAP_KEY)) : VideoMode.VideoOff;

        if (addVideoParamsMap.hasKey(INVOKE_SHOW_WIDGET_MAP_KEY)) {
            Glance.addVisitorVideo(videoMode, addVideoParamsMap.getBoolean(INVOKE_SHOW_WIDGET_MAP_KEY));
        }
        Glance.addVisitorVideo(videoMode);
        // TODO: check how the video would work in RN in this case, since we don't use the DefaultUI (maybe the architecture refact to match the iOS format would help) 
    }

    @ReactMethod
    private String getVisitorId() {
        return Glance.getVisitorId();
    }

    @ReactMethod
    private void getVisitorStartParams(Callback callback) {
        ReadableMap addVideoParamsMap = startParamsToMap(Glance.getVisitorStartParams());
        callback.invoke(null, addVideoParamsMap);
    }

    // PRESENCE CALLS -------------------------------------

    @ReactMethod
    private void setPresenceStartParams(ReadableMap startSessionParamsMap) {
        StartParams params = null;
        if (startSessionParamsMap != null) {
            params = parseStartParams(startSessionParamsMap, null);
        }

        Glance.setPresenceStartParams(params);
    }

    @ReactMethod
    private void getPresenceVideoMode(Callback callback) {
        VideoMode videoMode = Glance.getPresenceVideoMode();
        String videoModeStr = videoMode == null ? VideoMode.VideoOff.getValue() : videoMode.getValue();
        callback.invoke(null, videoModeStr);
    }

    @ReactMethod
    private Boolean arePresenceTermsDisplayed() {
        return Glance.arePresenceTermsDisplayed();
    }

    // Here we have the same considerations as for the init() methods
    @ReactMethod
    private void connectToPresence(ReadableMap presenceParamsMap) {
        GlanceTimeout glanceTimeout = presenceParamsMap.hasKey(GLANCE_TIMEOUT_MAP_KEY) ? new GlanceTimeout(presenceParamsMap.getInt(GLANCE_TIMEOUT_MAP_KEY)) : null;
        GlanceAttempts glanceAttempts = presenceParamsMap.hasKey(GLANCE_ATTEMPTS_MAP_KEY) ? new GlanceAttempts(presenceParamsMap.getInt(GLANCE_ATTEMPTS_MAP_KEY)) : null;
        boolean registerNotifications = getMapBoolean(presenceParamsMap, REGISTER_PRESENCE_NOTIFICATIONS_MAP_KEY, false);

        switch (presenceParamsMap.getInt(METHOD_VARIATION_MAP_KEY)) {
            case 1:
                connectToPresence();
                break;
            case 2:
                connectToPresence(glanceTimeout);
                break;
            case 3:
                connectToPresence(glanceAttempts);
                break;
            case 4:
                connectToPresence(registerNotifications);
                break;
            case 5:
                connectToPresence(registerNotifications, glanceTimeout);
                break;
            case 6:
                connectToPresence(registerNotifications, glanceAttempts);
                break;
            default:
                Log.e(TAG, "connectToPresence() not called since the specific variation wasn't selected. Did you passed the variation number through the property 'methodVariation'?");
                break;
        }
    }

    // # 1
    private void connectToPresence() {
        Glance.connectToPresence();
    }

    // # 2
    private void connectToPresence(GlanceTimeout glanceTimeout) {
        Glance.connectToPresence(glanceTimeout);
    }

    // # 3
    private void connectToPresence(GlanceAttempts glanceAttempts) {
        Glance.connectToPresence(glanceAttempts);
    }

    // # 4
    private void connectToPresence(boolean registerNotifications) {
        Glance.connectToPresence(registerNotifications);
    }

    // # 5
    private void connectToPresence(boolean registerNotifications, GlanceTimeout glanceTimeout) {
        Glance.connectToPresence(registerNotifications, glanceTimeout);
    }

    // # 6
    private void connectToPresence(boolean registerNotifications, GlanceAttempts glanceAttempts) {
        Glance.connectToPresence(registerNotifications, glanceAttempts);
    }

    @ReactMethod
    private void sendToPresenceSession(ReadableMap presenceParamsMap) {
        String event = getMapString(presenceParamsMap, PRESENCE_EVENT_MAP_KEY, "");
        Map<String, String> data = null;

        if (presenceParamsMap.hasKey(PRESENCE_DATA_MAP_KEY)) {
            ReadableMap presenceDataMap = presenceParamsMap.getMap(PRESENCE_DATA_MAP_KEY);
            Map<String, Object> dataAux = presenceDataMap.toHashMap();

            data = new HashMap<>();
            for (Map.Entry<String, Object> entry : dataAux.entrySet()) {
                data.put(entry.getKey(), String.valueOf(entry.getValue()));
            }
        }

        Glance.sendToPresenceSession(event, data);
    }

    @ReactMethod
    private void disconnectPresence() {
        Glance.disconnectPresence();
    }

    @ReactMethod
    private void sendPresenceTermsDisplayed() {
        Glance.sendPresenceTermsDisplayed();
    }

    @ReactMethod
    private Boolean isPresenceConnected() {
        return Glance.isPresenceConnected();
    }

    // GLANCE MANAGER CALLS -------------------------------------

    @ReactMethod
    private String getApplicationName() {
        return Glance.getApplicationName();
    }

    @ReactMethod
    private void maskKeyboard(boolean maskKeyboard) {
        Glance.maskKeyboard(maskKeyboard);
    }

    /**
     * getForegroundActivity() is not needed here since we don't work with activities directly in RN.
     **/

    @ReactMethod
    private void restartAgentVideo() {
        Glance.restartAgentVideo();
    }

    @ReactMethod
    private void getCapturedScreenSize(Callback callback) {
        WritableMap screenSize = Arguments.createMap();
        Point point = Glance.getCapturedScreenSize();

        screenSize.putInt(SCREEN_X_VALUE, point.x);
        screenSize.putInt(SCREEN_Y_VALUE, point.y);
        callback.invoke(null, screenSize);
    }

    // LISTENER METHODS
    @Override
    public void onGlanceVisitorEvent(Event event) {
        WritableMap eventMap = Arguments.createMap();
        final EventCode eventCode = event.getCode();

        if (eventCode == EventCode.EventVisitorInitialized) {
            if (connectingViaPresence) {
                Glance.connectToPresence();
            }
        } else if (eventCode == EventCode.EventConnectedToSession) {
            eventMap.putString(SESSION_KEY_MAP_KEY, event.GetValue(EventConstants.ATTR_VALUE_SESSION_KEY));
            eventMap.putString(VIDEO_MODE_MAP_KEY, event.GetValue(EventConstants.ATTR_VALUE_VIDEO_MODE));
        } else if (eventCode == EventCode.EventGuestCountChange) {
            eventMap.putInt(GUEST_COUNT_MAP_KEY, parseInt(event.GetValue(EventConstants.ATTR_VALUE_GUEST_COUNT)));
        } else if (eventCode == EventCode.EventMessageReceived) {
            String message = event.GetValue(EventConstants.ATTR_MESSAGE_KEY);
            eventMap.putString(EVENT_RECEIVED_MESSAGE_MAP_KEY, message);

            if (!TextUtils.isEmpty(message)) {
                switch (message) {
                    case EventConstants.ATTR_MESSAGE_WIDGET_LOCATION:
                        eventMap.putString(EVENT_RECEIVED_MESSAGE_VALUE_MAP_KEY, event.GetValue(EventConstants.ATTR_VALUE_LOCATION));
                        break;
                    case EventConstants.ATTR_MESSAGE_WIDGET_VISIBILITY:
                        eventMap.putString(EVENT_RECEIVED_MESSAGE_VALUE_MAP_KEY, event.GetValue(EventConstants.ATTR_VALUE_VISIBILITY));
                        break;
                    default:
                        break;
                }
            }
        } else if (eventCode == EventCode.EventSessionEnded) {
            startingSession = false;
        } else if (eventCode == EventCode.EventPresenceDisconnected) {
            connectingViaPresence = false;
        } else if (event.getType() == EventType.EventWarning ||
                event.getType() == EventType.EventError ||
                event.getType() == EventType.EventAssertFail) {

            eventMap.putString(EVENT_WARNING_MESSAGE_MAP_KEY, event.getMessageString());
        }

        eventMap.putString(EVENT_CODE_MAP_KEY, eventCode.toString());
        eventMap.putString(EVENT_TYPE_MAP_KEY, event.getType().toString());

        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(GLANCE_EVENT_LISTENER_KEY, eventMap);
    }


    // OTHER - TODO: review which @ReactMethod should be kept

    @ReactMethod
    private void openWebView(String url, String querySelectors, String labels) {
        final Intent i = new Intent(getReactApplicationContext(), GlanceWebViewActivity.class);
        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_MULTIPLE_TASK);
        i.putExtra("url", url);
        i.putExtra("querySelectors", querySelectors);
        i.putExtra("labels", labels);
        getReactApplicationContext().startActivity(i);
    }

    @ReactMethod
    private void setGlanceGroupID(String groupID) {
        int glanceGroupID = parseInt(groupID);

        Glance.init(getCurrentActivity(), glanceGroupID, null, this);
    }

    @ReactMethod
    private void setGlanceServer(String server) {
        Log.d(TAG, "setGlanceServer: " + server);
        Settings settings = new Settings();
        settings.Set(Settings.GLANCE_SERVER, server);
    }

    private VisitorInitParams parseVisitorInitParams(ReadableMap params) {
        VisitorInitParams visitorInitParams = new VisitorInitParams(getMapInt(params, GROUP_ID_MAP_KEY, 0));
        visitorInitParams.setVisitorId(getMapString(params, VISITOR_ID_MAP_KEY, null));
        visitorInitParams.setSite(getMapString(params, SITE_MAP_KEY, null));
        visitorInitParams.setToken(getMapString(params, TOKEN_MAP_KEY, null));
        visitorInitParams.setName(getMapString(params, NAME_MAP_KEY, null));
        visitorInitParams.setEmail(getMapString(params, EMAIL_MAP_KEY, null));
        visitorInitParams.setPhone(getMapString(params, PHONE_MAP_KEY, null));
        visitorInitParams.setCameras(getMapString(params, ALLOWED_CAMERAS_MAP_KEY, "\"front\",\"back\""));

        return visitorInitParams;
    }

    private StartParams parseStartParams(ReadableMap params, String sessionKey) {
        StartParams startParams = new StartParams();

        DisplayParams displayParams = new DisplayParams();
        if (params.hasKey(DISPLAY_PARAMS_MAP_KEY)) {
            ReadableMap displayParamsMap = params.getMap(DISPLAY_PARAMS_MAP_KEY);

            displayParams.setDisplayName(getMapString(displayParamsMap, DISPLAY_PARAMS_NAME_MAP_KEY, null));
            displayParams.setScale(getMapDouble(displayParamsMap, DISPLAY_PARAMS_SCALE_MAP_KEY, 1.0).floatValue());
            displayParams.setCaptureWidth(getMapInt(displayParamsMap, DISPLAY_PARAMS_WIDTH_MAP_KEY, 0));
            displayParams.setCaptureHeight(getMapInt(displayParamsMap, DISPLAY_PARAMS_HEIGHT_MAP_KEY, 0));
            displayParams.setVideo(getMapBoolean(params, DISPLAY_PARAMS_VIDEO_MAP_KEY, false));
        }

        VideoMode videoMode = VideoMode.getEnum(getMapString(params, VIDEO_MODE_MAP_KEY, VideoMode.VideoOff.getValue()));

        startParams.setDisplayParams(displayParams);
        startParams.setCaptureEntireScreen(getMapBoolean(params, START_PARAMS_CAPTURE_ENTIRE_SCREEN_MAP_KEY, false));
        startParams.setMediaProjectionEnabled(getMapBoolean(params, START_PARAMS_MEDIA_PROJECTION_MAP_KEY, false));
        startParams.setMainCallId(getMapInt(params, START_PARAMS_MAIN_CALL_ID_MAP_KEY, 0));
        startParams.setMaxGuests(getMapInt(params, START_PARAMS_MAX_GUESTS_MAP_KEY, 0).shortValue());
        startParams.setShow(getMapBoolean(params, START_PARAMS_SHOW_MAP_KEY, false));
        startParams.setGuestInfoFlags(getMapInt(params, START_PARAMS_GUEST_INFO_FLAGS_MAP_KEY, 0).longValue());
        startParams.setEncrypt(getMapBoolean(params, START_PARAMS_ENCRYPT_MAP_KEY, false));
        startParams.setKey(sessionKey);
        startParams.setRequestRC(getMapBoolean(params, START_PARAMS_REQUEST_RC_MAP_KEY, false));
        startParams.setInstantJoin(getMapBoolean(params, START_PARAMS_INSTANT_JOIN_MAP_KEY, false));
        startParams.setForceTunnel(getMapBoolean(params, START_PARAMS_FORCE_TUNNEL_MAP_KEY, false));
        startParams.setViewerCloseable(getMapBoolean(params, START_PARAMS_VIEWER_CLOSEABLE_MAP_KEY, false));
        startParams.setReportErrors(getMapBoolean(params, START_PARAMS_REPORT_ERRORS_MAP_KEY, false));
        startParams.setPersist(getMapBoolean(params, START_PARAMS_PERSIST_MAP_KEY, false));
        startParams.setPresenceStart(getMapBoolean(params, START_PARAMS_PRESENCE_START_MAP_KEY, false));
        startParams.setPaused(getMapBoolean(params, START_PARAMS_PAUSED_MAP_KEY, false));
        startParams.setShowTerms(getMapBoolean(params, START_PARAMS_SHOW_TERMS_MAP_KEY, true));
        startParams.setVideo(videoMode);
        startParams.setTermsUrl(getMapString(params, START_PARAMS_TERMS_URL_MAP_KEY, null));

        Log.d(TAG, "start params >>> " + startParams);

        return startParams;
    }

    private WritableMap startParamsToMap(StartParams params) {
        WritableMap paramsMap = Arguments.createMap();

        DisplayParams displayParams = params.getDisplayParams();
        if (displayParams != null) {
            WritableMap displayParamsMap = Arguments.createMap();
            displayParamsMap.putString(DISPLAY_PARAMS_NAME_MAP_KEY, displayParams.getDisplayName());
            displayParamsMap.putDouble(DISPLAY_PARAMS_SCALE_MAP_KEY, displayParams.getScale());
            displayParamsMap.putInt(DISPLAY_PARAMS_WIDTH_MAP_KEY, displayParams.getCaptureWidth());
            displayParamsMap.putInt(DISPLAY_PARAMS_HEIGHT_MAP_KEY, displayParams.getCaptureHeight());
            displayParamsMap.putBoolean(DISPLAY_PARAMS_VIDEO_MAP_KEY, displayParams.isVideo());

            paramsMap.putMap(DISPLAY_PARAMS_MAP_KEY, displayParamsMap);
        }

        // for some reason, isCaptureEntireScreen(), isMediaProjectionEnabled(),
        // isPresenceStart(), and isPaused() are not public
        Long mainCallId = params.getMainCallId();
        Long guestFlags = null;
        Short maxGuests = null;

        try {
            guestFlags = params.getGuestInfoFlags();
        } catch (Exception e) {
            // it throws a NPE when there's no value, not sure why
        }

        try {
            maxGuests = params.getMaxGuests();
        } catch (Exception e) {
            // it throws a NPE when there's no value, not sure why
        }

        VideoMode videoMode = params.getVideo();

        paramsMap.putInt(START_PARAMS_MAIN_CALL_ID_MAP_KEY, mainCallId == null ? 0 : Math.toIntExact(mainCallId));
        paramsMap.putInt(START_PARAMS_MAX_GUESTS_MAP_KEY, maxGuests == null ? 0 : Math.toIntExact(maxGuests));
        paramsMap.putBoolean(START_PARAMS_SHOW_MAP_KEY, params.getShow());
        paramsMap.putInt(START_PARAMS_GUEST_INFO_FLAGS_MAP_KEY, guestFlags == null ? 0 : Math.toIntExact(guestFlags));
        paramsMap.putBoolean(START_PARAMS_ENCRYPT_MAP_KEY, params.getEncrypt());
        paramsMap.putString(SESSION_KEY_MAP_KEY, params.getKeyAsString());
        paramsMap.putBoolean(START_PARAMS_REQUEST_RC_MAP_KEY, params.getRequestRC());
        paramsMap.putBoolean(START_PARAMS_INSTANT_JOIN_MAP_KEY, params.getInstantJoin());
        paramsMap.putBoolean(START_PARAMS_FORCE_TUNNEL_MAP_KEY, params.getForceTunnel());
        paramsMap.putBoolean(START_PARAMS_VIEWER_CLOSEABLE_MAP_KEY, params.getViewerCloseable());
        paramsMap.putBoolean(START_PARAMS_REPORT_ERRORS_MAP_KEY, params.getReportErrors());
        paramsMap.putBoolean(START_PARAMS_PERSIST_MAP_KEY, params.getPersist());
        paramsMap.putBoolean(START_PARAMS_SHOW_TERMS_MAP_KEY, params.getShowTerms());
        paramsMap.putString(VIDEO_MODE_MAP_KEY, videoMode != null ? videoMode.getValue() : VideoMode.VideoOff.getValue());
        paramsMap.putString(START_PARAMS_TERMS_URL_MAP_KEY, params.getTermsUrl());

        return paramsMap;
    }

    private Integer getMapInt(ReadableMap data, String key, Integer defaultValue) {
        return data.hasKey(key) && !data.isNull(key) ? data.getInt(key) : (Integer) defaultValue;
    }

    private String getMapString(ReadableMap data, String key, String defaultValue) {
        return data.hasKey(key) && !data.isNull(key) ? data.getString(key) : defaultValue;
    }

    private Double getMapDouble(ReadableMap data, String key, Double defaultValue) {
        return data.hasKey(key) && !data.isNull(key) ? data.getDouble(key) : defaultValue;
    }

    private Boolean getMapBoolean(ReadableMap data, String key, boolean defaultValue) {
        return data.hasKey(key) && !data.isNull(key) ? data.getBoolean(key) : defaultValue;
    }
}
