import React, {useEffect} from 'react';
import {Alert, NativeEventEmitter, NativeModules} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {persistor, store} from './src/redux/store';
import RootStack from './src/scaffolding/navigation/RootStack';

const {GlanceBridge} = NativeModules;
const eventEmitter = new NativeEventEmitter(GlanceBridge);

const {
  GLANCE_EVENT_LISTENER_KEY,
  SESSION_KEY_MAP_KEY,
  EventConnectedToSession,
  EventGuestCountChanged,
  EventSessionEnded,
} = GlanceBridge.getConstants();

function App(): JSX.Element {
  const onGlanceEvent = eventEmitter.addListener(
    GLANCE_EVENT_LISTENER_KEY,
    async event => {
      if (event.code === EventConnectedToSession) {
        Alert.alert('Session key:', event[SESSION_KEY_MAP_KEY]);
      } else if (event.code === EventGuestCountChanged) {
      } else if (event.code === EventSessionEnded) {
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
          <RootStack />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
