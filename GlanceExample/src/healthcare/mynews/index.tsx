import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';
import Card from './Card';

import Styles from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

const CARDS_JSON = [
  {
    title: 'Global Health to launch Medicare Advantage',
    date: 'September 14, 2018',
    description:
      'Global Health joins a slew of other health insurers that are busy investing in the Medicare Advantage market...',
    image: require('../../../resources/images/photo-medicare.png'),
  },
  {
    title: "Global Health's App, Smiling Doctor finds your doctor",
    date: 'September 10, 2018',
    description:
      'Matching up the right doctor with your medical needs can be hard. This new app helps you in your search!',
    image: require('../../../resources/images/photo-smiling-doctor.png'),
  },
  {
    title: 'Cutting higher payments to long-term care hospitals',
    date: 'September 10, 2018',
    description:
      'Only 18 percent of non gym-goers hit both goals. The activity boost translated to actual health benefits, too...',
    image: require('../../../resources/images/photo-hospital.png'),
  },
];

export default class MyNews extends Component {
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
        <SubHeader color="red" text="Global Health News" />

        <Content contentContainerStyle={styles.content}>
          {cardsDiv}
          <View style={styles.buttonView}>
            <Button elevation={0} style={styles.button}>
              <Text uppercase={false} style={styles.buttonText}>
                See more
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
  buttonView: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
  button: {
    width: 94,
    height: 26,
    borderRadius: 23,
    backgroundColor: Styles.colors.red,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
  },
});
