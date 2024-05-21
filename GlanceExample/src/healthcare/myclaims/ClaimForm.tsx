import React, {Component} from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native';
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

import RadioButton from '../../scaffolding/components/RadioButton';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';
import Banner from '../shared/Banner';

import Styles from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

export default class ClaimForm extends Component {
  state = {};

  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }

  render() {
    const {navigation} = this.props;
    const {sex, relationship} = this.state;

    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true}></Header>
        <SubHeader color="green" text="My Claims" />

        <Content contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerSubview}>
              <Text style={styles.headerText}>Claim Submission Form</Text>
            </View>
          </View>
          <View style={styles.form}>
            <View style={styles.formSection}>
              <Text style={styles.formHeader}>Patient Information</Text>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Patient Name"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={styles.input}
                value={this.state.name}
                onChangeText={text => this.setState({name: text})}></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Patient Date of Birth"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.dob}
                onChangeText={text => this.setState({dob: text})}></TextInput>
              <View style={{flexDirection: 'row', marginVertical: 20}}>
                <Text style={styles.questionText}>Sex</Text>
                <RadioButton
                  isSelected={sex === 'male'}
                  onPress={() => this.setState({sex: 'male'})}
                  outerColor={'#9B9B9B'}
                  borderWidthMultiplier={0.2}
                />
                <Text style={styles.answerText}>Male</Text>
                <RadioButton
                  isSelected={sex === 'female'}
                  onPress={() => this.setState({sex: 'female'})}
                  outerColor={'#9B9B9B'}
                  borderWidthMultiplier={0.2}
                />
                <Text style={styles.answerText}>Female</Text>
              </View>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Patient Address"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={styles.input}
                value={this.state.address}
                onChangeText={text =>
                  this.setState({address: text})
                }></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Phone Number"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.phone}
                onChangeText={text => this.setState({phone: text})}></TextInput>
              <Text style={[styles.questionText, {marginTop: 15}]}>
                Patient relationship to Insured
              </Text>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <RadioButton
                  label="Self"
                  isSelected={relationship === 'self'}
                  onPress={() => this.setState({relationship: 'self'})}
                  outerColor={'#9B9B9B'}
                  borderWidthMultiplier={0.2}
                />
                <RadioButton
                  label="Spouse"
                  isSelected={relationship === 'spouse'}
                  onPress={() => this.setState({relationship: 'spouse'})}
                  outerColor={'#9B9B9B'}
                  borderWidthMultiplier={0.2}
                />
                <RadioButton
                  label="Child"
                  isSelected={relationship === 'child'}
                  onPress={() => this.setState({relationship: 'child'})}
                  outerColor={'#9B9B9B'}
                  borderWidthMultiplier={0.2}
                />
                <RadioButton
                  label="Other"
                  isSelected={relationship === 'other'}
                  onPress={() => this.setState({relationship: 'other'})}
                  outerColor={'#9B9B9B'}
                  borderWidthMultiplier={0.2}
                />
              </View>
            </View>
            <View style={styles.formSection}>
              <Text style={styles.formHeader}>Insurance Information</Text>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Date of Current Illness or Injury"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={styles.input}
                value={this.state.injuryDate}
                onChangeText={text =>
                  this.setState({injuryDate: text})
                }></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Dates of Patient Unable to Work"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.unableToWorkDates}
                onChangeText={text =>
                  this.setState({unableToWorkDates: text})
                }></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Hospitalization Dates"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.hospitalizationDates}
                onChangeText={text =>
                  this.setState({hospitalizationDates: text})
                }></TextInput>
            </View>
            <View style={styles.formSection}>
              <Text style={styles.formHeader}>Service Record</Text>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Name of Referring Provider"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={styles.input}
                value={this.state.referringProvider}
                onChangeText={text =>
                  this.setState({referringProvider: text})
                }></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Date of Service"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.serviceDate}
                onChangeText={text =>
                  this.setState({serviceDate: text})
                }></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Procedures/Services"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.procedures}
                onChangeText={text =>
                  this.setState({procedures: text})
                }></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="$ Charges"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.charges}
                onChangeText={text =>
                  this.setState({charges: text})
                }></TextInput>
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Button
                elevation={0}
                onPress={() => navigation.pop()}
                style={[
                  styles.button,
                  {backgroundColor: Styles.colors.darkGray},
                ]}>
                <Text uppercase={false} style={styles.buttonText}>
                  Cancel
                </Text>
              </Button>
              <Button
                elevation={0}
                onPress={() => navigation.navigate('ClaimComplete')}
                style={[styles.button, {backgroundColor: Styles.colors.green}]}>
                <Text uppercase={false} style={styles.buttonText}>
                  Submit
                </Text>
              </Button>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,
              }}>
              <Button
                elevation={0}
                onPress={() => navigation.navigate('CustomerService')}
                style={[styles.button, {width: 300}]}>
                <Text uppercase={false} style={styles.buttonText}>
                  Need help filing a claim?
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
    backgroundColor: Styles.colors.white,
  },
  content: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 50,
  },
  header: {
    marginBottom: 20,
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
  formSection: {
    borderBottomColor: Styles.colors.border,
    borderBottomWidth: 1,
    paddingBottom: 30,
    marginBottom: 20,
  },
  formHeader: {
    fontSize: 19,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 17,
    marginRight: 20,
  },
  answerText: {
    marginLeft: 10,
    marginRight: 20,
  },
  radio: {
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#CDCDCD',
    borderRadius: 0,
    fontWeight: '500',
    height: 50,
    paddingLeft: 12,
    fontSize: 17,
  },
  buttonRows: {
    marginTop: 30,
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
