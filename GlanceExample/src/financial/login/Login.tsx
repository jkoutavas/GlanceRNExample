import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import HeaderDefault from '../shared/components/HeaderDefault';
import LoginForm from './LoginForm';
import LoginHeading from './LoginHeading';
import LoginImage from './LoginImage';

export default class Login extends Component {
  render() {
    return (
      <Container style={styles.component}>
        <HeaderDefault
          showHomeButton={true}
          showSettingsButton={true}
          title="Global Investments"></HeaderDefault>

        <Content contentContainerStyle={styles.content}>
          <View style={styles.view}>
            <LoginImage />
            <LoginHeading />
            <LoginForm />
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
});
