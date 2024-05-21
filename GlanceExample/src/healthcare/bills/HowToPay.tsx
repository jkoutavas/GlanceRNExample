import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Image} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Button, Text, Picker} from 'native-base';

import {storeHowToPay} from '../../redux/healthcare';
import RadioButton from '../../scaffolding/components/RadioButton';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';

import {Styles} from '../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';

class HowToPay extends Component {
  state = {
    howToPay: this.props.howToPay || {},
  };

  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }

  onPress(type) {
    let howToPay = this.state;
    howToPay.type = type;
    this.setState({howToPay});
  }

  onChange(key, value) {
    let howToPay = this.state;
    howToPay[key] = value;
    this.setState({howToPay});
  }

  onSave() {
    this.props.dispatch(
      storeHowToPay(this.state.howToPay, () => this.props.navigation.pop()),
    );
  }

  render() {
    const {navigation} = this.props;
    const {howToPay} = this.state;
    const value = howToPay.type;
    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true}></Header>
        <SubHeader color="blue" text="View/Pay Bills" />

        <Content contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerSubview}>
              <Text style={styles.headerText}>Choose how to pay</Text>
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <View style={styles.row}>
              <View style={styles.radioRow}>
                <RadioButton
                  isSelected={value === 'credit_card'}
                  onPress={() => this.onPress('credit_card')}
                  outerColor={'#9B9B9B'}
                  borderWidthMultiplier={0.2}
                />
                <Text style={styles.radioText}>Credit Card</Text>
                <View style={{width: '65%', alignItems: 'flex-end'}}>
                  <Image
                    source={require('../../../resources/images/photo-cc.png')}
                  />
                </View>
              </View>
              <View style={{marginBottom: 15}}>
                <Text style={styles.inputLabel}>
                  Name (as it appears on your card)
                </Text>
                <TextInput
                  autoCapitalize={'none'}
                  placeholder="Required"
                  placeholderTextColor={'rgba(0,0,0,0.5)'}
                  style={styles.input}
                  value={howToPay.name}
                  onChangeText={text => this.onChange('name', text)}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text style={styles.inputLabel}>
                  Card Number (no dashes or spaces)
                </Text>
                <TextInput
                  autoCapitalize={'none'}
                  placeholder="Required"
                  placeholderTextColor={'rgba(0,0,0,0.5)'}
                  style={styles.input}
                  value={howToPay.cardNumber}
                  onChangeText={text => this.onChange('cardNumber', text)}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.inputLabel}>Expiration Date</Text>
                  <Text style={[styles.inputLabel, {marginRight: 20}]}>
                    CVV2/CVC2
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <GlanceIcon
                        name="icon-chevron"
                        style={{
                          marginRight: 15,
                          transform: [{rotate: '-90deg'}],
                          color: '#CDCDCD',
                          fontSize: 10,
                        }}
                      />
                    }
                    placeholder="Month"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    placeholderIconColor="rgba(0,0,0,0.5)"
                    style={[styles.dropdown, {width: 130}]}
                    selectedValue={howToPay.month}
                    onValueChange={text => this.onChange('month', text)}>
                    <Picker.Item label="January" value="01" />
                    <Picker.Item label="February" value="02" />
                    <Picker.Item label="March" value="03" />
                    <Picker.Item label="April" value="04" />
                    <Picker.Item label="May" value="05" />
                    <Picker.Item label="June" value="06" />
                    <Picker.Item label="July" value="07" />
                    <Picker.Item label="August" value="08" />
                    <Picker.Item label="September" value="09" />
                    <Picker.Item label="October" value="10" />
                    <Picker.Item label="November" value="11" />
                    <Picker.Item label="December" value="12" />
                  </Picker>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <GlanceIcon
                        name="icon-chevron"
                        style={{
                          marginRight: 15,
                          transform: [{rotate: '-90deg'}],
                          color: '#CDCDCD',
                          fontSize: 10,
                        }}
                      />
                    }
                    placeholder="Year"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    placeholderIconColor="rgba(0,0,0,0.5)"
                    style={[styles.dropdown, {borderLeftWidth: 0, width: 100}]}
                    selectedValue={howToPay.year}
                    onValueChange={text => this.onChange('year', text)}>
                    <Picker.Item label="2018" value="2018" />
                    <Picker.Item label="2019" value="2019" />
                    <Picker.Item label="2020" value="2020" />
                    <Picker.Item label="2021" value="2021" />
                    <Picker.Item label="2022" value="2022" />
                    <Picker.Item label="2023" value="2023" />
                    <Picker.Item label="2024" value="2024" />
                    <Picker.Item label="2025" value="2025" />
                    <Picker.Item label="2026" value="2026" />
                    <Picker.Item label="2027" value="2027" />
                    <Picker.Item label="2028" value="2028" />
                  </Picker>
                  <TextInput
                    autoCapitalize={'none'}
                    placeholder="3 digit code"
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    style={[styles.input, {marginLeft: 5, width: '30%'}]}
                    value={howToPay.cvv}
                    onChangeText={text => this.onChange('cvv', text)}
                  />
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.radioRow}>
                <RadioButton
                  isSelected={value === 'bank_account'}
                  onPress={() => this.onPress('bank_account')}
                  outerColor={'#9B9B9B'}
                  borderWidthMultiplier={0.2}
                />
                <Text style={styles.radioText}>Bank Account</Text>
              </View>
              <View style={{marginBottom: 15}}>
                <Text style={styles.inputLabel}>Routing Number</Text>
                <TextInput
                  autoCapitalize={'none'}
                  placeholder="9 digits"
                  placeholderTextColor={'rgba(0,0,0,0.5)'}
                  style={styles.input}
                  value={howToPay.routing}
                  onChangeText={text => this.onChange('routing', text)}
                />
              </View>
              <View>
                <Text style={styles.inputLabel}>Account Number</Text>
                <TextInput
                  autoCapitalize={'none'}
                  placeholder="Required"
                  placeholderTextColor={'rgba(0,0,0,0.5)'}
                  style={styles.input}
                  value={howToPay.account}
                  onChangeText={text => this.onChange('account', text)}
                />
              </View>
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
    howToPay: Healthcare.howToPay,
  };
}
export default connect(mapStateToProps)(HowToPay);

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
  row: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Styles.colors.border,
  },
  radioRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  radioText: {
    marginLeft: 20,
  },
  inputLabel: {
    color: Styles.colors.text,
    fontSize: 14,
    marginBottom: 7,
  },
  input: {
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#CDCDCD',
    borderRadius: 0,
    fontWeight: '500',
    height: 50,
    paddingLeft: 12,
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#CDCDCD',
    borderRadius: 0,
    height: 50,
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
