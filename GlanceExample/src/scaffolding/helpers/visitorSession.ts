import {Alert, NativeModules, Platform, findNodeHandle} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StartParams from '../bridging/startParams';
import {toJSON} from '../../utils/parsers';
import CONSTANTS from '../../utils/constants';

const GlanceBridge = NativeModules.GlanceBridge;
const {
  METHOD_VARIATION_MAP_KEY,
  GROUP_ID_MAP_KEY,
  START_PARAMS_ENCRYPT_MAP_KEY,
  PRESENCE_EVENT_MAP_KEY,
  PRESENCE_DATA_MAP_KEY,
} = GlanceBridge.getConstants();

// Visitor Session statuses
export const statuses = {
  stopped: 0,
  connecting: 1,
  connected: 2,
  agentConnected: 3,
};

// Presence statuses
export const presenceStatuses = {
  stopped: 0,
  connecting: 1,
  running: 2,
};

export const openWebView = async () => {
  const groupID = await AsyncStorage.getItem(GROUP_ID_MAP_KEY);
  if (groupID === null || groupID.length === 0) {
    Alert.alert(
      `Unable to initialize visitor.`,
      `Please make sure you have configured your Group ID.`,
    );
    return;
  }
  if (Platform.OS === 'android') {
    GlanceBridge.setGlanceGroupID(groupID);
  }

  const url = await AsyncStorage.getItem(CONSTANTS.Settings.MASKING_URL);
  const querySelectors = await AsyncStorage.getItem(
    CONSTANTS.Settings.MASKING_QUERY_SELECTORS,
  );
  const labels = await AsyncStorage.getItem(CONSTANTS.Settings.MASKING_LABELS);
  GlanceBridge.openWebView(url, querySelectors, labels);
};

export const startSession = async videoMode => {
  let groupID = await AsyncStorage.getItem(GROUP_ID_MAP_KEY);
  groupID = groupID === null ? 0 : parseInt(groupID);

  // const videoMode = await AsyncStorage.getItem('videoMode'); TODO: provide a dropwdown in the Settings screen with the valid options

  if (groupID.length === 0) {
    Alert.alert(
      `Unable to start your visitor session.`,
      `Please make sure you have configured your Group ID.`,
    );
    return;
  }

  const glanceService = await AsyncStorage.getItem(
    CONSTANTS.Settings.GLANCE_SERVER,
  );
  if (glanceService != null && glanceService != '') {
    GlanceBridge.setGlanceServer(glanceService);
  }

  const startParams = new StartParams();
  startParams.videoMode = videoMode;

  const dataMap = toJSON(startParams);
  dataMap[METHOD_VARIATION_MAP_KEY] = 3; // choosing the specific init() method variation from the GlanceBridge class
  dataMap[GROUP_ID_MAP_KEY] = groupID;
  dataMap[START_PARAMS_ENCRYPT_MAP_KEY] = true;

  GlanceBridge.maskKeyboard(true);

  Alert.alert(
    'Share app with the agent?',
    'The agent can guide you through this app only. You can stop sharing at any time.',
    [
      {
        text: 'Accept',
        onPress: () => GlanceBridge.startSession(dataMap),
      },
      {
        text: 'Decline',
        onPress: () => console.log('Declined'),
        style: 'cancel',
      },
    ],
  );
};

export const stopVisitorSession = async () => {
  GlanceBridge.endSession();
};

export const endPresence = async onSuccess => {
  GlanceBridge.disconnectPresence();
  if (onSuccess) {
    onSuccess();
  }
};

export const signalFinancialPresence = viewStr => {
  signalPresence(`[Financial] ${viewStr} View`);
};

export const signalHealthcarePresence = viewStr => {
  signalPresence(`[Healthcare] ${viewStr} View`);
};

export const signalPresence = async viewStr => {
  let presenceData = {};
  presenceData[PRESENCE_EVENT_MAP_KEY] = 'event';
  presenceData[PRESENCE_DATA_MAP_KEY] = {url: viewStr};
  GlanceBridge.sendToPresenceSession(presenceData);
};
