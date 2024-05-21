import React, {Component} from 'react';
import {
  NativeModules,
  StyleSheet,
  View,
  NativeEventEmitter,
  findNodeHandle,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Container, Content} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';

import {
  stopVisitorSession,
  statuses,
  signalPresence,
  openWebView,
} from '../scaffolding/helpers/visitorSession';
import HomeHeader from './HomeHeader';
import HomeLogo from './HomeLogo';
import HomeQuickDemo from './HomeQuickDemo';
import HomeStructuredDemos from './HomeStructuredDemos';
import VisitorInitParams from '../scaffolding/bridging/visitorInitParams';
import StartParams from '../scaffolding/bridging/startParams';
import {toJSON} from '../utils/parsers';

const GlanceEventEmitter = NativeModules.GlanceEventEmitter;
const eventEmitter = new NativeEventEmitter(GlanceEventEmitter);

const GlanceBridge = NativeModules.GlanceBridge;
const {
  GROUP_ID_MAP_KEY,
  VISITOR_ID_MAP_KEY,
  METHOD_VARIATION_MAP_KEY,
  GLANCE_TIMEOUT_MAP_KEY,
  GLANCE_EVENT_LISTENER_KEY,
  SESSION_KEY_MAP_KEY,
  EventVisitorInitialized,
  EventConnectedToSession,
  EventSessionEnded,
} = GlanceBridge.getConstants();

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.logoViewRef = React.createRef();
    this.focusListener = null;
  }

  state = {
    sessionStatus: statuses.stopped,
    logoViewId: -1,
  };

  blurListener = this.props.navigation.addListener('blur', () => {
    GlanceBridge.removeMaskedViewId(this.state.logoViewId);
  });

  onGlanceEvent = eventEmitter.addListener(
    GLANCE_EVENT_LISTENER_KEY,
    async event => {
      console.log('RECEIVED EVENT >>>', event);

      //TODO: check if the reason why the invoke commands from the TestAgentPresence is not working is related
      // to the non-use of the DefautUI in this case

      if (event.code == EventVisitorInitialized) {
        let connectToPresenceAfterInit = await AsyncStorage.getItem(
          CONSTANTS.Settings.CONNECT_TO_PRESENCE_AFTER_INIT,
        );
        connectToPresenceAfterInit =
          connectToPresenceAfterInit === null
            ? false
            : JSON.parse(connectToPresenceAfterInit);

        if (connectToPresenceAfterInit == true) {
          dataMap = {};
          dataMap[METHOD_VARIATION_MAP_KEY] = 4; // choosing the specific init() method variation from the GlanceBridge class
          GlanceBridge.connectToPresence(dataMap);
        }
      } else if (event.code == EventConnectedToSession) {
        this.updateRunning(statuses.connected);

        Alert.alert(`Session key:`, event[SESSION_KEY_MAP_KEY]);
      } else if (event.code == EventSessionEnded) {
        this.updateRunning(statuses.stopped);
      }
    },
  );

  setupFocusListener = reactTag => {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this.setState({
          logoViewId: await GlanceBridge.addMaskedViewId(reactTag, 'MASKED 2'),
        });

        let groupID = await AsyncStorage.getItem(GROUP_ID_MAP_KEY);
        groupID = groupID === null ? 0 : parseInt(groupID);

        let visitorID = await AsyncStorage.getItem(VISITOR_ID_MAP_KEY);
        if (visitorID === null || visitorID === '') {
          Alert.alert(
            `Unable to connect to presence.`,
            `Please make sure you have configured your Visitor ID.`,
          );
          return;
        }
        const visitorInitParams = new VisitorInitParams(groupID);
        const dataMap = toJSON(visitorInitParams);

        let presenceEnabled = await AsyncStorage.getItem(
          CONSTANTS.Settings.PRESENCE_ENABLED,
        );
        presenceEnabled =
          presenceEnabled === null ? false : JSON.parse(presenceEnabled);

        if (presenceEnabled) {
          dataMap[METHOD_VARIATION_MAP_KEY] = 4; // choosing the specific init() method variation from the GlanceBridge class
          dataMap[VISITOR_ID_MAP_KEY] = visitorID;
          GlanceBridge.init(dataMap);

          const captureMode = await AsyncStorage.getItem(
            CONSTANTS.Settings.CAPTURE_MODE,
          );

          if (captureMode != CONSTANTS.CaptureMode.LEGACY) {
            const startParams = new StartParams();
            // startParams.videoMode = videoMode; //TODO: create a select box on settings screen so the customers can choose it

            if (captureMode == CONSTANTS.CaptureMode.MEDIA_PROJECTION) {
              startParams.mMediaProjectionEnabled = true;
            } else {
              startParams.mCaptureEntireScreen = true;
            }

            GlanceBridge.setPresenceStartParams(toJSON(startParams));
          } else {
            GlanceBridge.setPresenceStartParams(null);
          }

          await AsyncStorage.setItem(
            CONSTANTS.Settings.CONNECT_TO_PRESENCE_AFTER_INIT,
            JSON.stringify(true),
          );
        } else {
          await AsyncStorage.setItem(
            CONSTANTS.Settings.CONNECT_TO_PRESENCE_AFTER_INIT,
            JSON.stringify(false),
          );

          dataMap[METHOD_VARIATION_MAP_KEY] = 5; // choosing the specific init() method variation from the GlanceBridge class
          dataMap[GLANCE_TIMEOUT_MAP_KEY] = 3000;
          GlanceBridge.init(dataMap);
        }
      },
    );
  };

  async componentDidMount() {
    const reactTag = findNodeHandle(this.logoViewRef.current);

    this.setupFocusListener(reactTag);

    signalPresence('[Main] Home View');
  }

  componentWillUnmount() {
    this.focusListener(); // removes it
    this.blurListener(); // removes it
    this.onGlanceEvent.remove(); // removes it
  }

  showImagePicker() {
    launchImageLibrary({}, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
    });
  }

  updateRunning = async status => {
    const jsonValue = JSON.stringify(status);
    this.setState({sessionStatus: JSON.parse(status)});
    await AsyncStorage.setItem(CONSTANTS.Settings.SESSION_STATUS, jsonValue);
  };

  render() {
    return (
      <Container style={styles.component}>
        <HomeHeader></HomeHeader>

        <Content contentContainerStyle={styles.content}>
          <View style={styles.view}>
            <View collapsable={false} ref={this.logoViewRef}>
              <HomeLogo />
            </View>
            <HomeStructuredDemos />

            <HomeQuickDemo
              sessionStatus={this.state.sessionStatus}
              showImagePicker={this.showImagePicker}
              stopVisitorSession={stopVisitorSession}
              openWebView={openWebView}></HomeQuickDemo>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: '#2DA7DF',
  },
  content: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  view: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-around',
  },
});
