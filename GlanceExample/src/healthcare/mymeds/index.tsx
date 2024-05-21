import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';
import Card from './Card';

import Styles from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

const CARDS_JSON = [
  {
    lastFillDate: '10/12/2018',
    medicationName: 'Livodcin',
    dosage: '5 mg',
    doctor: 'Dr. Ronn Johnson, MD',
    refills: 5,
  },
  {
    lastFillDate: '08/01/2018',
    medicationName: 'Annocodone',
    dosage: '5 mg',
    doctor: 'Dr. Ronn Johnson, MD',
    refills: 1,
  },
  {
    lastFillDate: '10/12/2018',
    medicationName: 'Setiphormine',
    dosage: '10 mg',
    doctor: 'Dr. Ellen Hartwood, MD',
    refills: 5,
  },
  {
    lastFillDate: '05/22/2018',
    medicationName: 'Livodcin',
    dosage: '5 mg',
    doctor: 'Dr. Ellen Hartwood, MD',
    refills: 8,
  },
  {
    lastFillDate: '01/16/2018',
    medicationName: 'Hydroxicillin',
    dosage: 'Nasal Spray',
    doctor: 'Dr. Ellen Hartwood, MD',
    refills: 12,
  },
];

export default class MyMeds extends Component {
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
        <SubHeader color="purple" text="My Medications" />

        <Content contentContainerStyle={styles.content}>{cardsDiv}</Content>
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
});
