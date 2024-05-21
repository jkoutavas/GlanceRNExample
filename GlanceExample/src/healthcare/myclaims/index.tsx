import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';
import Card from './Card';

import {Styles} from '../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

const CARDS_JSON = [
  {
    dateOfService: '02/12/2018',
    hospital: 'Cupertino Medical Clinic',
    doctor: 'Dr. Ronn Johnson, MD',
    amountCovered: '$432.22',
    amountOwed: '$67.12',
  },
  {
    dateOfService: '01/24/2018',
    hospital: 'El Camino Hospital',
    doctor: '',
    amountCovered: '$349.15',
    amountOwed: '$23.97',
  },
  {
    dateOfService: '10/11/2017',
    hospital: 'Gental Dental',
    doctor: 'Dr. David Smith, DDS',
    amountCovered: '$78.25',
    amountOwed: '$0',
  },
];

export default class MyClaims extends Component {
  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }
  render() {
    let cardsDiv = [];
    CARDS_JSON.forEach((card, index) => {
      cardsDiv.push(
        <Card
          key={'card_' + index}
          {...card}
          navigation={this.props.navigation}
        />,
      );
    });
    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true}></Header>
        <SubHeader color="green" text="My Claims" />

        <Content contentContainerStyle={styles.content}>
          {cardsDiv}
          <View>
            <Button
              elevation={0}
              onPress={() => this.props.navigation.navigate('FileClaim')}
              style={[styles.button, styles.green]}>
              <Text uppercase={false} style={styles.buttonText}>
                File a Claim
              </Text>
            </Button>
            <Button
              elevation={0}
              onPress={() => this.props.navigation.navigate('CustomerService')}
              style={[styles.button, styles.blue]}>
              <Text uppercase={false} style={styles.buttonText}>
                Need help filing a claim?
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: Styles.colors.gray,
  },
  content: {
    marginTop: 20,
    paddingBottom: 50,
  },
  button: {
    flex: 1,
    width: 310,
    height: 46,
    borderRadius: 23,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  green: {
    backgroundColor: Styles.colors.green,
  },
  blue: {
    backgroundColor: Styles.colors.blue,
  },
  buttonText: {
    width: '100%',
    fontSize: 20,
    textAlign: 'center',
  },
});
