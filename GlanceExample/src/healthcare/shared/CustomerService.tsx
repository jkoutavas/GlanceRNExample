import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {Container, Content, Button} from 'native-base';

import GlanceIcon from '../../scaffolding/components/GlanceIcon';
import {startSession} from '../../scaffolding/helpers/visitorSession';

import Header from './Header';
import {Styles} from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

export default class CustomerService extends Component {
  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }
  render() {
    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true} />

        <Content contentContainerStyle={styles.content}>
          <View style={styles.view}>
            <Image
              source={require('../../../resources/images/customer-service.png')}
            />
            <View style={styles.subview}>
              <Text style={styles.bold}>We're here to help</Text>
              <Text style={styles.text}>
                Contact us by starting an In-App visual call or call us
                directly. Please have your account number from the back of your
                health plan ID card.
              </Text>
            </View>
            <View style={styles.subview}>
              <Text style={styles.bold}>Start an In-App Visual Call</Text>
              <Text style={[styles.text, styles.small]}>
                Call one of our experts without ever leaving the app! You can
                start an In-App call right now or schedule a time and we’ll
                connect with you while you’re in the app. Your customer care
                representative will see what you see and guide you through the
                app. You even have the chance to see your agent live for better
                care!
              </Text>
              <Button
                block
                iconLeft
                onPress={startSession}
                style={[styles.button, styles.red]}
                elevation={0}>
                <GlanceIcon name="icon-phone-outline" style={styles.icon} />
                <Text style={{color: Styles.colors.white, fontSize: 15}}>
                  Start a Visual Call
                </Text>
              </Button>
              <Button
                block
                iconLeft
                onPress={startSession}
                style={[styles.button, styles.blue]}
                elevation={0}>
                <GlanceIcon name="icon-calendar-outline" style={styles.icon} />
                <Text style={{color: Styles.colors.white, fontSize: 15}}>
                  Schedule a Visual Call
                </Text>
              </Button>
            </View>
          </View>
          <View style={styles.subview}>
            <Text style={styles.bold}>Talk to us</Text>
            <Text style={[styles.text, styles.small]}>
              Chat with experts right now or schedule a call back. Customer
              Service is open from 7 AM - 8 PM Mountain Time. For the U.S. call:{' '}
            </Text>
            <Text style={styles.phone}>1 (800) XXX-XXXX</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexGrow: 1,
  },
  view: {
    alignItems: 'center',
    flexGrow: 1,
  },
  subview: {
    borderBottomWidth: 1,
    borderBottomColor: Styles.colors.border,
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  text: {
    color: Styles.colors.text,
  },
  phone: {
    color: Styles.colors.blue,
    fontSize: 20,
    marginTop: 10,
  },
  small: {
    fontSize: 13,
  },
  bold: {
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    height: 34,
    borderRadius: 23,
    color: Styles.colors.white,
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
  },
  red: {
    backgroundColor: Styles.colors.red,
  },
  blue: {
    backgroundColor: Styles.colors.blue,
  },
  icon: {
    fontSize: 20,
    color: '#FFF',
    marginRight: 10,
  },
});
