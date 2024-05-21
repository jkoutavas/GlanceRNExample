import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Content,
  Button,
  Text,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Icon,
} from 'native-base';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';
import Banner from '../shared/Banner';

import Styles from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

export default class FileClaim extends Component {
  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }
  render() {
    const {navigation} = this.props;
    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true}></Header>
        <SubHeader color="green" text="My Claims" />

        <Content>
          <View>
            <Image
              source={require('../../../resources/images/photo-claims.png')}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.headerSubview}>
                <Text style={styles.headerText}>Submitting a claim</Text>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{color: Styles.colors.text}}>
                Submitting a claim is easy. Simply fill out the form and your
                claim will be processed within the next 14 days.
              </Text>
              <Text style={{color: Styles.colors.text, marginTop: 10}}>
                We will contact you with any questions or needs.
              </Text>
            </View>
            <View style={{marginTop: 30}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Button
                  elevation={0}
                  onPress={() => navigation.pop()}
                  style={[
                    styles.button,
                    {backgroundColor: Styles.colors.darkGray},
                  ]}>
                  <Text uppercase={false} style={styles.buttonText}>
                    Cancel
                  </Text>
                </Button>
                <Button
                  elevation={0}
                  onPress={() => navigation.navigate('ClaimForm')}
                  style={[
                    styles.button,
                    {backgroundColor: Styles.colors.green},
                  ]}>
                  <Text uppercase={false} style={styles.buttonText}>
                    Continue
                  </Text>
                </Button>
              </View>
              <View
                style={{
                  flex: 1,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 10,
                }}>
                <Button
                  elevation={0}
                  onPress={() => navigation.navigate('CustomerService')}
                  style={[styles.button, {width: 300}]}>
                  <Text uppercase={false} style={styles.buttonText}>
                    Need help filing a claim?
                  </Text>
                </Button>
              </View>
            </View>
          </View>
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
  headerSubview: {
    borderBottomColor: Styles.colors.border,
    borderBottomWidth: 1,
  },
  headerText: {
    color: Styles.colors.blue,
    fontSize: 22,
    marginBottom: 5,
  },
  button: {
    width: 140,
    height: 50,
    borderRadius: 23,
    backgroundColor: Styles.colors.blue,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },
});
