import React, {useEffect} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {CONSTANTS} from './utils/constants';
import {persistor, store} from './src/redux/store';

const GlanceEventEmitter = NativeModules.GlanceEventEmitter;
const eventEmitter = new NativeEventEmitter(GlanceEventEmitter);

const GlanceBridge = NativeModules.GlanceBridge;
const {GLANCE_EVENT_LISTENER_KEY, EventPresenceConnected} =
  GlanceBridge.getConstants();

function App(): JSX.Element {
  const onGlanceEvent = eventEmitter.addListener(
    GLANCE_EVENT_LISTENER_KEY,
    async event => {
      if (event.code === EventPresenceConnected) {
        const jsonValue = JSON.stringify(statuses.agentConnected);
        await AsyncStorage.setItem(
          CONSTANTS.Settings.PRESENCE_STATUS,
          jsonValue,
        );
      }
    },
  );

  useEffect(() => {
    AsyncStorage.removeItem(CONSTANTS.Settings.SESSION_STATUS);
    return onGlanceEvent.remove();
  }, [onGlanceEvent]);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Text style={styles.title}>Hello, world.</Text>
        </PersistGate>
      </Provider>
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
