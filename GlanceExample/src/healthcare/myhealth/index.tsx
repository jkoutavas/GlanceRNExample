import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';
import Banner from '../shared/Banner';
import Card from './Card';

import GlanceIcon from '../../scaffolding/components/GlanceIcon';

import Styles from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

const CARDS_JSON = [
  {
    title: '40 Health Benefits of Yoga',
    author: 'Mary Smith',
    description:
      'A growing number of studies indicate that yoga may be a beneficial treatment for mental health issues',
    image: require('../../../resources/images/photo-yoga.png'),
  },
  {
    title: 'Health and Diet Guide',
    author: 'Gary Wei',
    description:
      'What makes up a healthy diet -- and how do you go about getting one?',
    image: require('../../../resources/images/photo-fruits.png'),
  },
  {
    title: 'How Going to the Gym Helps Your Health',
    author: 'Ami Westing',
    description:
      'Only 18 percent of non gym-goers hit both goals. The activity boost translated to actual health benefits, too...',
    image: require('../../../resources/images/photo-workout.png'),
  },
];

export default class MyHealth extends Component {
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
        <SubHeader color="lightBlue" text="My Health" />
        <Banner
          theme="light"
          header="Going to the Gym?"
          subtext="Save money with the Global Healthcare Best Life program."
          buttonText="Enroll Now"
          onPress={() => this.props.navigation.navigate('Enrollment')}
        />

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
  enrollBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
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
    fontSize: 13,
    color: Styles.colors.text,
  },
  enrollNow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    backgroundColor: Styles.colors.lightBlue,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
  },
});
