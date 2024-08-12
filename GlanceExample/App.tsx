/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component} from 'react';
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
  startSession,
  endSession,
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

interface AppState {
  version: string;
  key: string;
  modalVisible: boolean;
  modalText: string;
  showModalButtons: boolean;
}

class App extends Component<{}, AppState> {
  private logoViewRef: React.RefObject<Text>;

  constructor(props: any) {
    super(props);

    this.logoViewRef = React.createRef();

    this.state = {
      version: '',
      key: '',
      modalVisible: false,
      modalText: '',
      showModalButtons: true,
    };

    this.startSession = this.startSession.bind(this);
    this.endSession = this.endSession.bind(this);
    this.showConfirmationModal = this.showConfirmationModal.bind(this);
    this.showAlertModal = this.showAlertModal.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.testActions = this.testActions.bind(this);
  }

  onGlanceEvent = eventEmitter.addListener(
    GLANCE_EVENT_LISTENER_KEY,
    async event => {
      console.log('RECEIVED EVENT >>>', event);

      if (event.code === EventConnectedToSession) {
        this.setState({
          modalText: `Session Code: ${event[SESSION_KEY_MAP_KEY]}`,
        });
        this.showAlertModal();
      } else if (event.code === EventGuestCountChange) {
        this.hideModal();
      } else if (event.code === EventSessionEnded) {
        endSession();
      }
    },
  );

  async componentDidMount() {
    const reactTag = findNodeHandle(this.logoViewRef.current);
    addMaskedViewId(reactTag || 0, 'MASKED 1');

    const version = await getVersion();
    this.setState({version: version});

    const visitorInitParams = new VisitorInitParams(21489);
    const dataMap = toJSON(visitorInitParams);

    init(dataMap);
  }

  componentWillUnmount() {
    this.onGlanceEvent.remove();
  }

  showConfirmationModal() {
    this.setState({
      modalVisible: true,
      showModalButtons: true,
    });
  }

  showAlertModal() {
    this.setState({
      modalVisible: true,
      showModalButtons: false,
    });
  }

  handleYes() {
    endSession();
    this.setState({modalVisible: false});
  }

  hideModal() {
    this.setState({modalVisible: false});
  }

  startSession() {
    const startParams = new StartParams();
    startParams.videoMode = 'videooff';

    if (this.state.key.trim().length > 0) {
      startParams.key = this.state.key;
    }

    const dataMap = toJSON(startParams);
    dataMap[START_PARAMS_ENCRYPT_MAP_KEY] = true;

    startSession(dataMap);
  }

  endSession() {
    this.setState({
      modalText: 'End session?',
    });
    this.showConfirmationModal();
  }

  setKey = (text: string) => {
    this.setState({key: text});
  };

  async testActions(): Promise<void> {
    const reactTag = findNodeHandle(this.logoViewRef.current) as number;
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
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>SDK Version: {this.state.version}</Text>
        </View>

        <Text style={styles.text} ref={this.logoViewRef}>
          Glance SDK
        </Text>

        <Text style={styles.label}>Enter Key:</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.setKey}
          value={this.state.key}
          placeholder="Type Key..."
        />

        <Button title="Start Session" onPress={this.startSession} />

        <Button title="End Session" onPress={this.endSession} />

        <Button title="Test Actions" onPress={this.testActions} />

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({modalVisible: false})}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>{this.state.modalText}</Text>
              {this.state.showModalButtons ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleYes}>
                    <Text style={styles.buttonText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.hideModal}>
                    <Text style={styles.buttonText}>No</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.hideModal}>
                    <Text style={styles.buttonText}>Ok</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

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
