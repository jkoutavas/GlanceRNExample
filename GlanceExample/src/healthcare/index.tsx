import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Button, Text} from 'native-base';
import {signalHealthcarePresence} from '../scaffolding/helpers/visitorSession';

import Header from './shared/Header';
import Card from './shared/Card';

import {Styles} from '../globalStyles';

const CARDS_JSON = [
  {
    icon: 'icon-myplan',
    title: 'My Plan',
    color: 'orange',
    subtextBold: '',
    subtextNumber: '',
    subtext: 'Global Healthcare Shield Bronze',
    buttonText: 'View Your Plan',
    onClick: 'MyPlan',
  },
  {
    icon: 'icon-myclaim',
    title: 'My Claims',
    color: 'green',
    subtextBold: '',
    subtextNumber: '0',
    subtext: 'Active Claims',
    buttonText: 'Manage Claims',
    onClick: 'MyClaims',
  },
  {
    icon: 'icon-yourhealth',
    title: 'My Health',
    color: 'lightBlue',
    subtextBold: '',
    subtextNumber: '',
    subtext: 'Ways to Improve Your Health',
    buttonText: 'Your Options',
    onClick: 'MyHealth',
  },
  {
    icon: 'icon-news',
    title: 'Global News',
    color: 'red',
    subtextBold: '',
    subtextNumber: '',
    subtext: 'Latest News About Healthcare',
    buttonText: 'Learn More',
    onClick: 'MyNews',
  },
  {
    icon: 'icon-mydoctors',
    title: 'My Doctors',
    color: 'teal',
    subtextBold: '',
    subtextNumber: '5',
    subtext: 'Physicians',
    buttonText: 'Manage Doctors',
    onClick: 'MyDoctors',
  },
  {
    icon: 'icon-meds',
    title: 'My Medications',
    color: 'purple',
    subtextBold: '',
    subtextNumber: '5',
    subtext: 'Active Prescriptions',
    buttonText: 'Review',
    onClick: 'MyMeds',
  },
];

class HealthcareMain extends Component {
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
        <Header showHomeButton={true} showSettingsButton={true} />

        <Content contentContainerStyle={styles.content}>
          <View style={styles.view}>
            <Text style={styles.welcome}>Welcome, {this.props.username}!</Text>
            <View style={styles.cards}>{cardsDiv}</View>
            <View style={styles.buttonView}>
              <Button
                elevation={0}
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Bills')}>
                <Text uppercase={false} style={styles.buttonText}>
                  Never miss a payment with AutoPay
                </Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: Styles.colors.gray,
    paddingBottom: 20,
  },
  content: {
    flexGrow: 1,
  },
  view: {
    alignItems: 'center',
    flexGrow: 1,
  },
  welcome: {
    flexGrow: 1,
    backgroundColor: Styles.colors.white,
    color: Styles.colors.blue,
    fontSize: 22,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
    maxHeight: 50,
  },
  cards: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Styles.colors.gray,
  },
  buttonView: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    height: 46,
    borderRadius: 23,
    backgroundColor: Styles.colors.blue,
  },
  buttonText: {
    color: '#FFF',
    fontSize: Dimensions.get('window').width < 375 ? 15 : 20,
  },
});

function mapStateToProps(state) {
  const {App} = state;

  return {
    username: App.username,
  };
}
export default connect(mapStateToProps)(HealthcareMain);
