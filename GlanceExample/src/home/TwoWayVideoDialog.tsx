import React, {Component} from 'react';
import {
  NativeModules,
  StyleSheet,
  View,
  NativeEventEmitter,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Container, Content, Text, Button} from 'native-base';

import {startSession} from '../scaffolding/helpers/visitorSession';

import HomeHeader from './HomeHeader';
import GlanceIcon from '../scaffolding/components/GlanceIcon';

import Styles from '../globalStyles';
import {signalPresence, statuses} from '../scaffolding/helpers/visitorSession';

import CONSTANTS from '../utils/constants';

const GlanceEventEmitter = NativeModules.GlanceEventEmitter;
const eventEmitter = new NativeEventEmitter(GlanceEventEmitter);

const GlanceBridge = NativeModules.GlanceBridge;
const {GLANCE_EVENT_LISTENER_KEY, VideoSmallMultiway, EventGuestCountChange} =
  GlanceBridge.getConstants();

export default class TwoWayVideoDialog extends Component {
  onGlanceEvent = eventEmitter.addListener(
    GLANCE_EVENT_LISTENER_KEY,
    async event => {
      if (event.code == EventGuestCountChange) {
        const jsonValue = JSON.stringify(statuses.agentConnected);
        this.setState({sessionStatus: JSON.parse(statuses.agentConnected)});
        await AsyncStorage.setItem(
          CONSTANTS.Settings.SESSION_STATUS,
          jsonValue,
        );

        this.props.navigation.popToTop();
      }
    },
  );

  componentDidMount() {
    signalPresence('[Main] 2-Way Video Dialog View');
  }

  componentWillUnmount() {
    this.onGlanceEvent.remove();
  }

  updateRunning = async () => {
    const sessionStatus = await AsyncStorage.getItem(
      CONSTANTS.Settings.SESSION_STATUS,
    );

    console.log(`sessionStatus: ${sessionStatus}`);
    if (sessionStatus === statuses.agentConnected.toString()) {
      this.props.navigation.popToTop();
    }
  };

  render() {
    return (
      <Container style={styles.component}>
        <HomeHeader
          text="2-Way Video"
          showHomeButton={false}
          showBackButton={true}></HomeHeader>
        <Content contentContainerStyle={styles.content}>
          <View style={styles.view}>
            <View style={{paddingTop: 20, paddingBottom: 50}}>
              <Text style={styles.header}>
                Glance 2-Way Video + Screenshare
              </Text>
              <Text style={styles.paragraph}>
                You are about to start a video call with a representative. When
                you tap "Start Your Video Chat", a representive will join to
                assist you.
              </Text>
            </View>
            <View style={{width: '100%', paddingTop: 0}}>
              <Button
                block
                iconLeft
                onPress={() => {
                  startSession(VideoSmallMultiway);
                }}
                style={[styles.button, styles.blue]}
                elevation={0}>
                <GlanceIcon name="icon-start-two-way" style={styles.icon} />
                <Text
                  uppercase={false}
                  style={{
                    color: Styles.colors.white,
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  Start Your Video Chat
                </Text>
              </Button>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.terms}>
                  By tapping Start Your Video, you agree to our
                </Text>
                <Text
                  onPress={() =>
                    this.props.navigation.navigate('GlanceWebView')
                  }
                  style={[styles.terms, styles.link]}>
                  Terms and Conditions
                </Text>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  component: {},
  content: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  view: {
    alignItems: 'center',
    flexGrow: 1,
    paddingHorizontal: 26,
  },
  header: {
    fontSize: 22,
    color: Styles.colors.blue,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 20,
    marginRight: 10,
  },
  image: {
    backgroundColor: 'red',
    width: '100%',
    paddingLeft: 10,
  },
  icon: {
    fontSize: 25,
    color: 'white',
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  blue: {
    backgroundColor: Styles.colors.blue,
  },
  terms: {
    fontSize: 13,
    lineHeight: 16,
  },
  link: {
    color: Styles.colors.blue,
    textDecorationLine: 'underline',
  },
});
