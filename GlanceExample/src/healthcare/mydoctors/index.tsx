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
    lastVisitDate: '08/12/18',
    doctor: 'Ronn Johnson, MD',
    doctorType: 'General Practitioner',
    hospital: 'Stanford Medical Hospital',
    address1: '300 Pasteur Dr',
    address2: 'Stanford, CA 94305',
    phone: '(408) XXX-XXXX',
  },
  {
    lastVisitDate: '03/08/18',
    doctor: 'Ellen Hartwood, MD',
    doctorType: 'Internal Medicine',
    hospital: 'Stanford Medical Hospital',
    address1: '300 Pasteur Dr',
    address2: 'Stanford, CA 94305',
  },
  {
    lastVisitDate: '02/12/18',
    doctor: 'Ronn Johnson, MD',
    doctorType: 'General Practitioner',
    hospital: 'Stanford Medical Hospital',
    address1: '300 Pasteur Dr',
    address2: 'Stanford, CA 94305',
  },
  {
    lastVisitDate: '01/02/18',
    doctor: 'Dr. David Smith, DDS',
    doctorType: 'Dentist',
    hospital: 'Gental Dentist',
    address1: '11234 Torre Ave',
    address2: 'San Jose, CA 95129',
  },
];

export default class MyDoctors extends Component {
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
        <SubHeader color="teal" text="My Doctors" />

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
