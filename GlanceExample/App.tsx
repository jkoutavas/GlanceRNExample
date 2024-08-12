import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  NativeModules,
  NativeEventEmitter,
  Modal,
  TouchableOpacity,
  findNodeHandle,
} from 'react-native';
import StartParams from './src/utils/startParams';
import VisitorInitParams from './src/utils/visitorInitParams';
import {toJSON} from './src/utils/parsers';
import {
  getConstants,
  getVersion,
  addMaskedViewId,
  removeMaskedViewId,
  init,
  startSession as startSessionFromPackage,
  endSession as endSessionFromPackage,
  getVisitorCallId,
  isInSession,
  isVideoAvailable,
  isAgentVideoEnabled,
  togglePause,
  pause,
  updateVisitorVideoSize,
  updateWidgetVisibility,
  updateWidgetLocation,
  sendUserMessage,
  maskKeyboard,
  getVisitorId,
} from '@glance-networks/reactnative-bridge';

const {GlanceBridge} = NativeModules;

const {
  GLANCE_EVENT_LISTENER_KEY,
  START_PARAMS_ENCRYPT_MAP_KEY,
  SESSION_KEY_MAP_KEY,
  EventConnectedToSession,
  EventGuestCountChange,
  EventSessionEnded,
} = getConstants();

const eventEmitter = new NativeEventEmitter(GlanceBridge);

const App: React.FC = () => {
  const [version, setVersion] = useState('');
  const [key, setKey] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [showModalButtons, setShowModalButtons] = useState(true);
  const logoViewRef = useRef<Text>(null);

  useEffect(() => {
    const reactTag = findNodeHandle(logoViewRef.current);
    addMaskedViewId(reactTag || 0, 'MASKED 1');

    const fetchVersion = async () => {
      const ver = await getVersion();
      setVersion(ver);

      const visitorInitParams = new VisitorInitParams(21489);
      const dataMap = toJSON(visitorInitParams);

      init(dataMap);
    };

    fetchVersion();

    const onGlanceEvent = eventEmitter.addListener(
      GLANCE_EVENT_LISTENER_KEY,
      async event => {
        console.log('RECEIVED EVENT >>>', event);

        if (event.code === EventConnectedToSession) {
          setModalText(`Session Code: ${event[SESSION_KEY_MAP_KEY]}`);
          showAlertModal();
        } else if (event.code === EventGuestCountChange) {
          hideModal();
        } else if (event.code === EventSessionEnded) {
          endSessionFromPackage();
        }
      },
    );

    return () => {
      onGlanceEvent.remove();
    };
  }, []);

  const showConfirmationModal = () => {
    setModalVisible(true);
    setShowModalButtons(true);
  };

  const showAlertModal = () => {
    setModalVisible(true);
    setShowModalButtons(false);
  };

  const handleYes = () => {
    endSessionFromPackage();
    setModalVisible(false);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const startSession = () => {
    const startParams = new StartParams();
    startParams.videoMode = 'videooff';

    if (key.trim().length > 0) {
      startParams.key = key;
    }

    const dataMap = toJSON(startParams);
    dataMap[START_PARAMS_ENCRYPT_MAP_KEY] = true;

    startSessionFromPackage(dataMap);
  };

  const confirmEndSession = () => {
    setModalText('End session?');
    showConfirmationModal();
  };

  const testActions = async (): Promise<void> => {
    const reactTag = findNodeHandle(logoViewRef.current) as number;
    removeMaskedViewId(reactTag);

    const callId = await getVisitorCallId();
    console.log('Call ID:', `${callId}`);

    const inSession = await isInSession();
    console.log('In session:', `${inSession}`);

    const isVideoAvailableRes = await isVideoAvailable();
    console.log('Video available:', `${isVideoAvailableRes}`);

    const isAgentVideoEnabledRes = await isAgentVideoEnabled();
    console.log('Agent Video enabled:', `${isAgentVideoEnabledRes}`);

    togglePause();

    pause(false);

    updateVisitorVideoSize(200, 300, 'Test');

    updateWidgetVisibility('Test');

    updateWidgetLocation('Test');

    sendUserMessage('Test', 'Value');

    maskKeyboard(false);

    const getVisitorIdRes = await getVisitorId();
    console.log('Visitor Id:', `${getVisitorIdRes}`);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>SDK Version: {version}</Text>
      </View>

      <Text style={styles.text} ref={logoViewRef}>
        Glance SDK
      </Text>

      <Text style={styles.label}>Enter Key:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setKey}
        value={key}
        placeholder="Type Key..."
      />

      <Button title="Start Session" onPress={startSession} />

      <Button title="End Session" onPress={confirmEndSession} />

      <Button title="Test Actions" onPress={testActions} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalText}</Text>
            {showModalButtons ? (
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleYes}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={hideModal}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={hideModal}>
                  <Text style={styles.buttonText}>Ok</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
});

export default App;
