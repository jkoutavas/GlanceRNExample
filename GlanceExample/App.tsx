import React, {useEffect} from 'react';
import {
  Alert,
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';

const {GlanceBridge} = NativeModules;
const eventEmitter = new NativeEventEmitter(GlanceBridge);

const {GLANCE_EVENT_LISTENER_KEY, SESSION_KEY_MAP_KEY, EventPresenceConnected} =
  GlanceBridge.getConstants();

function App(): JSX.Element {
  const onGlanceEvent = eventEmitter.addListener(
    GLANCE_EVENT_LISTENER_KEY,
    async event => {
      if (event.code === EventPresenceConnected) {
        Alert.alert('Session key:', event[SESSION_KEY_MAP_KEY]);
      }
    },
  );

  useEffect(() => {
    //AsyncStorage.removeItem(CONSTANTS.Settings.SESSION_STATUS);
    return onGlanceEvent.remove();
  }, [onGlanceEvent]);

  return (
    <SafeAreaProvider>
      <Text style={styles.title}>Hello, world.</Text>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
