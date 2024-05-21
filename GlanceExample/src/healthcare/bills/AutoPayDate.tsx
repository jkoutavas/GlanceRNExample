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
  Left,
  Body,
  Right,
  Icon,
} from 'native-base';

import {storeAutoPayDate} from '../../redux/healthcare';
import RadioButton from '../../scaffolding/components/RadioButton';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';
import Banner from '../shared/Banner';

import Styles from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

class AutoPayDate extends Component {
  state = {
    value: this.props.autoPayDate,
  };

  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }

  onPress(value) {
    this.setState({value});
  }

  onSave() {
    const {dispatch, navigation} = this.props;
    const {value} = this.state;
    dispatch(storeAutoPayDate(value, () => navigation.pop()));
  }

  render() {
    const {navigation} = this.props;
    const {value} = this.state;
    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true}></Header>
        <SubHeader color="blue" text="View/Pay Bills" />

        <Content contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerSubview}>
              <Text style={styles.headerText}>Choose when to pay</Text>
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={styles.mainText}>Apply your payment</Text>
            <Text style={styles.subText}>
              Your payment is due on the 1st of every month. Select a day to
              submit your payment.
            </Text>
          </View>
          <View style={{marginTop: 30}}>
            <View style={styles.radioRow}>
              <RadioButton
                isSelected={value === 'payment_due_date'}
                onPress={() => this.onPress('payment_due_date')}
                outerColor={'#9B9B9B'}
                borderWidthMultiplier={0.2}
              />
              <Text style={styles.radioText}>On the day payment is due</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton
                isSelected={value === '2_days_before'}
                onPress={() => this.onPress('2_days_before')}
                outerColor={'#9B9B9B'}
                borderWidthMultiplier={0.2}
              />
              <Text style={styles.radioText}>2 days before</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton
                isSelected={value === '4_days_before'}
                onPress={() => this.onPress('4_days_before')}
                outerColor={'#9B9B9B'}
                borderWidthMultiplier={0.2}
              />
              <Text style={styles.radioText}>4 days before</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton
                isSelected={value === '6_days_before'}
                onPress={() => this.onPress('6_days_before')}
                outerColor={'#9B9B9B'}
                borderWidthMultiplier={0.2}
              />
              <Text style={styles.radioText}>6 days before</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton
                isSelected={value === '8_days_before'}
                onPress={() => this.onPress('8_days_before')}
                outerColor={'#9B9B9B'}
                borderWidthMultiplier={0.2}
              />
              <Text style={styles.radioText}>8 days before</Text>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 50,
              }}>
              <Button
                elevation={0}
                onPress={this.onSave.bind(this)}
                style={styles.button}>
                <Text uppercase={false} style={styles.buttonText}>
                  Save
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
    autoPayDate: Healthcare.autoPayDate,
  };
}
export default connect(mapStateToProps)(AutoPayDate);

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
  mainText: {
    fontSize: 20,
    marginBottom: 15,
  },
  subText: {
    fontSize: 14,
    color: Styles.colors.text,
  },
  radioRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioText: {
    marginLeft: 20,
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
