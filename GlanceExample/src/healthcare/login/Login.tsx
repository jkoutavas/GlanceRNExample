import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Container, Content} from 'native-base';

import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';
import SubHeader from '../shared/SubHeader';

import GlanceIcon from '../../scaffolding/components/GlanceIcon';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

import {Styles} from '../../globalStyles';

export default class Login extends Component {
  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }
  render() {
    return (
      <Container style={styles.component}>
        <LoginHeader showHomeButton={true} showSettingsButton={true} />
        <SubHeader color="white" text="Sign In" hideBackButton />
        <View style={styles.registerBanner}>
          <View style={{width: '55%'}}>
            <Text style={{color: '#FFF'}}>Not Registered?</Text>
            <Text style={styles.regular}>
              Create an account to access your information.
            </Text>
          </View>
          <View style={styles.registerNow}>
            <Text style={styles.registerNowText}>Register Now</Text>
            <GlanceIcon name="icon-register" style={styles.registerNowIcon} />
          </View>
        </View>

        <Content contentContainerStyle={styles.content}>
          <View style={styles.view}>
            <LoginForm navigation={this.props.navigation} />
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
  registerBanner: {
    flexDirection: 'row',
    backgroundColor: Styles.colors.blue,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    zIndex: 1,
  },
  regular: {
    fontSize: Dimensions.get('window').width < 375 ? 10 : 12,
    color: Styles.colors.white,
    marginRight: 30,
  },
  registerNow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  registerNowText: {
    fontSize: Dimensions.get('window').width < 375 ? 15 : 18,
    color: '#FFF',
  },
  registerNowIcon: {
    marginLeft: 10,
    color: Styles.colors.white,
    fontSize: Dimensions.get('window').width < 375 ? 30 : 40,
  },
  content: {
    flexGrow: 1,
  },
  view: {
    alignItems: 'center',
    flexGrow: 1,
  },
});
