import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Button, Text} from 'native-base';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';
import Banner from '../shared/Banner';

import Styles from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

export default class ClaimComplete extends Component {
  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }
  render() {
    const {navigation} = this.props;
    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true}></Header>
        <SubHeader color="green" text="My Claims" />

        <Content contentContainerStyle={styles.content}>
          <Text style={{fontSize: 25, marginBottom: 20}}>Thank you!</Text>
          <Text
            style={{fontSize: 17, marginBottom: 20, color: Styles.colors.text}}>
            We will review your information and contact you via email with any
            questions or addtional information needs.
          </Text>
          <Button
            elevation={0}
            onPress={() => navigation.navigate('MyClaims')}
            style={styles.button}>
            <Text uppercase={false} style={styles.buttonText}>
              Back to My Claims
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: Styles.colors.white,
  },
  content: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 50,
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 23,
    backgroundColor: Styles.colors.green,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },
});
