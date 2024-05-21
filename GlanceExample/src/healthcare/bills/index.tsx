import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Button, Text, Icon} from 'native-base';

import {startSession} from '../../scaffolding/helpers/visitorSession';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';
import Banner from '../shared/Banner';

import GlanceIcon from '../../scaffolding/components/GlanceIcon';

import Styles from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

class Bills extends Component {
  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }

  render() {
    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true}></Header>
        <SubHeader color="blue" text="View/Pay Bills" />
        <Banner
          header="AutoPay"
          subtext="Set up automatic payments and never miss a bill."
          buttonText="Set Up Now"
          onPress={() => this.props.navigation.navigate('AutoPay')}
        />

        <Content contentContainerStyle={styles.content}>
          <View style={[styles.card, {flexDirection: 'row'}]}>
            <View style={styles.left}>
              <Text style={styles.mainText}>Account Info</Text>
              <Text style={styles.subText}>
                Update your email and phone number, change your password, and
                more.
              </Text>
            </View>
            <View style={styles.right}>
              <GlanceIcon
                name="icon-chevron"
                style={styles.iconChevron}></GlanceIcon>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.top}>
              <Text style={styles.mainText}>Account Info</Text>
              <Text style={styles.boldText}>General Hospital</Text>
              <Text style={styles.subText}>
                Guarantor: Global Healthcare ({this.props.username})
              </Text>
              <Text style={styles.subText}>Patients Covered: You</Text>
            </View>
            <View style={{alignItems: 'center', marginVertical: 20}}>
              <Text style={styles.boldText}>Amount Due</Text>
              <Text style={styles.moneyText}>$423.12</Text>
              <Button elevation={0} style={styles.buttonView}>
                <Text uppercase={false} style={styles.buttonText}>
                  Pay Now
                </Text>
              </Button>
              <Text style={styles.lastPaidText}>
                Last paid: $23.56 on 12/3/2019
              </Text>
            </View>
            <View style={styles.bottom}>
              <View>
                <GlanceIcon name="icon-statements" style={styles.icon} />
              </View>
              <View style={{paddingHorizontal: 20}}>
                <Text style={{color: Styles.colors.blue, fontSize: 19}}>
                  View Your Statements
                </Text>
                <Text style={styles.lastPaidText}>
                  (Last statement on 10/31/2019)
                </Text>
              </View>
              <View>
                <GlanceIcon
                  name="icon-chevron"
                  style={styles.iconChevron}></GlanceIcon>
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 30}}>
            <Text style={{fontSize: 18, marginBottom: 10}}>
              Questions? Contact Customer Service
            </Text>
            <Text style={styles.subText}>
              Chat with experts right now or schedule a call back.
            </Text>
            <Text style={styles.subText}>
              Customer Service is open from 7 AM - 8PM
            </Text>
            <Text style={styles.subText}>
              Mountain Time. For the U.S. call:{' '}
            </Text>
            <Text
              style={{
                marginVertical: 10,
                color: Styles.colors.blue,
                fontSize: 19,
              }}>
              1 (800) XXX-XXXX
            </Text>
            <Button
              block
              iconLeft
              onPress={startSession}
              style={[styles.callButton, styles.red]}
              elevation={0}>
              <GlanceIcon name="icon-phone-outline" style={styles.icon} />
              <Text
                uppercase={false}
                style={{color: Styles.colors.white, fontSize: 15}}>
                Start a Visual Call
              </Text>
            </Button>
            <Button
              block
              iconLeft
              onPress={startSession}
              style={[styles.callButton, styles.blue]}
              elevation={0}>
              <GlanceIcon name="icon-calendar-outline" style={styles.icon} />
              <Text
                uppercase={false}
                style={{color: Styles.colors.white, fontSize: 15}}>
                Schedule a Visual Call
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const {App} = state;

  return {
    username: App.username,
  };
}
export default connect(mapStateToProps)(Bills);

const styles = StyleSheet.create({
  component: {
    backgroundColor: Styles.colors.gray,
  },
  content: {
    marginTop: 20,
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 15,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  left: {
    width: '91%',
  },
  right: {
    width: '8%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 25,
    color: Styles.colors.blue,
  },
  mainText: {
    color: '#014E79',
    fontSize: 18,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subText: {
    color: Styles.colors.text,
    fontSize: 13,
  },
  moneyText: {
    color: Styles.colors.green,
    fontSize: 24,
  },
  lastPaidText: {
    color: Styles.colors.blue,
    fontSize: 13,
  },
  top: {
    borderBottomWidth: 1,
    borderBottomColor: Styles.colors.border,
    paddingBottom: 15,
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Styles.colors.border,
  },
  buttonView: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: Styles.colors.green,
    borderRadius: 23,
    width: 190,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    textAlign: 'center',
    width: '100%',
  },
  callButton: {
    height: 34,
    borderRadius: 23,
    color: Styles.colors.white,
    marginTop: 10,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
  },
  red: {
    backgroundColor: Styles.colors.red,
  },
  blue: {
    backgroundColor: Styles.colors.blue,
  },
  icon: {
    fontSize: 20,
    color: '#FFF',
    marginRight: 10,
  },
  iconChevron: {
    color: Styles.colors.lightBlue,
    fontSize: 25,
    // marginRight: 15,
    transform: [{rotate: '180deg'}],
  },
});
