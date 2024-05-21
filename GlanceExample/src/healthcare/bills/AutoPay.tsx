import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Content,
  Button,
  Text,
  List,
  ListItem,
  Body,
  Right,
} from 'native-base';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';

import Styles from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';

class AutoPay extends Component {
  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }

  getHowToPayValues() {
    const {howToPay} = this.props;
    let maintext = 'Choose how to pay';
    let subtext = 'Select your bank account or a credit card.';
    if (howToPay.type) {
      maintext = 'Payment method';
      switch (howToPay.type) {
        case 'credit_card':
          subtext = 'Credit Card - ' + howToPay.cardNumber.slice(-4);
          break;
        case 'bank_account':
          subtext = 'Bank Account - ' + howToPay.account.slice(-4);
          break;
      }
    }
    return {maintext, subtext};
  }

  getMonthlyAmountValues() {
    const {monthlyAmount} = this.props;
    let maintext = 'Choose a monthly amount';
    let subtext = 'Select the amount you wish to pay.';
    if (monthlyAmount) {
      maintext = 'Monthly amount';
      switch (monthlyAmount) {
        case 'total':
          subtext = 'Total New Balance';
          break;
        case 'minimum':
          subtext = 'Minimum Payment Due';
          break;
        case 'fixed':
          subtext = 'Fixed Amount';
          break;
      }
    }
    return {maintext, subtext};
  }

  getAutoPayDateValues() {
    const {autoPayDate} = this.props;
    const maintext = 'AutoPay date';
    let subtext;
    switch (autoPayDate) {
      case 'payment_due_date':
        subtext = 'On the day payment is due';
        break;
      case '2_days_before':
        subtext = '2 days before statement closing';
        break;
      case '4_days_before':
        subtext = '4 days before statement closing';
        break;
      case '6_days_before':
        subtext = '6 days before statement closing';
        break;
      case '8_days_before':
        subtext = '8 days before statement closing';
        break;
      default:
        subtext = 'Select a date to pay';
    }
    return {maintext, subtext};
  }

  render() {
    const {navigation} = this.props;
    const howToPayValues = this.getHowToPayValues();
    const monthlyAmountValues = this.getMonthlyAmountValues();
    const autoPayDateValues = this.getAutoPayDateValues();

    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true}></Header>
        <SubHeader color="blue" text="View/Pay Bills" />

        <Content contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerSubview}>
              <Text style={styles.headerText}>Set up AutoPay</Text>
            </View>
            <Text style={styles.headerSubtext}>
              Tell us how you want to set up your automatic payments.
            </Text>
          </View>
          <View>
            <List
              style={{
                marginTop: 20,
                borderTopWidth: 1,
                borderTopColor: Styles.colors.border,
              }}>
              <ListItem
                button
                onPress={() => navigation.navigate('HowToPay')}
                style={{marginLeft: 0}}>
                <Body style={{marginLeft: 15}}>
                  <Text>{howToPayValues.maintext}</Text>
                  <Text note style={styles.subtext}>
                    {howToPayValues.subtext}
                  </Text>
                </Body>
                <Right style={{flex: 0.1}}>
                  <GlanceIcon name="icon-chevron" style={styles.iconChevron} />
                </Right>
              </ListItem>
              <ListItem
                button
                onPress={() => navigation.navigate('MonthlyAmount')}
                style={{marginLeft: 0}}>
                <Body style={{marginLeft: 15}}>
                  <Text>{monthlyAmountValues.maintext}</Text>
                  <Text note style={styles.subtext}>
                    {monthlyAmountValues.subtext}
                  </Text>
                </Body>
                <Right style={{flex: 0.1}}>
                  <GlanceIcon name="icon-chevron" style={styles.iconChevron} />
                </Right>
              </ListItem>
              <ListItem
                button
                onPress={() => navigation.navigate('AutoPayDate')}
                style={{marginLeft: 0}}>
                <Body style={{marginLeft: 15}}>
                  <Text>{autoPayDateValues.maintext}</Text>
                  <Text note style={styles.subtext}>
                    {autoPayDateValues.subtext}
                  </Text>
                </Body>
                <Right style={{flex: 0.1}}>
                  <GlanceIcon name="icon-chevron" style={styles.iconChevron} />
                </Right>
              </ListItem>
            </List>
            <View style={styles.terms}>
              <Text style={styles.termsText}>AutoPay Terms & Conditions</Text>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 50,
              }}>
              <Button elevation={0} style={styles.button}>
                <Text uppercase={false} style={styles.buttonText}>
                  Submit
                </Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const {Healthcare} = state;

  return {
    howToPay: Healthcare.howToPay,
    monthlyAmount: Healthcare.monthlyAmount,
    autoPayDate: Healthcare.autoPayDate,
  };
}
export default connect(mapStateToProps)(AutoPay);

const styles = StyleSheet.create({
  component: {
    backgroundColor: Styles.colors.white,
  },
  content: {
    marginTop: 20,
    paddingBottom: 50,
  },
  header: {
    marginHorizontal: 20,
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
  headerSubtext: {
    marginTop: 5,
    color: Styles.colors.text,
  },
  subtext: {
    fontSize: 14,
    color: Styles.colors.text,
    marginTop: 5,
  },
  terms: {
    marginLeft: 20,
    marginTop: 10,
  },
  termsText: {
    color: Styles.colors.blue,
    fontSize: 13,
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
  iconChevron: {
    marginRight: 5,
    transform: [{rotate: '180deg'}],
  },
});
