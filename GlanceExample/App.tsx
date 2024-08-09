import React, {useEffect} from 'react';
import {
  Alert,
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const {GlanceBridge} = NativeModules;
const eventEmitter = new NativeEventEmitter(GlanceBridge);

const {GLANCE_EVENT_LISTENER_KEY, SESSION_KEY_MAP_KEY, EventPresenceConnected} =
  GlanceBridge.getConstants();

import {persistor, store} from './src/redux/store';

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
    marginLeft: 16,
    marginTop: 32,
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
