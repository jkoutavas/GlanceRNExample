import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';

import {Styles} from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

export default class ClaimForm extends Component {
  state = {};

  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }

  render() {
    const {navigation} = this.props;

    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true}></Header>
        <SubHeader color="lightBlue" text="My Health" />

        <Content contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerSubview}>
              <Text style={styles.headerText}>Best Life Enrollment</Text>
            </View>
          </View>
          <View style={styles.form}>
            <Text style={styles.text}>
              Did you know you could be eligible for reimbursement of your gym
              membership fees?
            </Text>
            <Text style={styles.text}>
              If you are eligible for reimbursement, please complete the form
              below.
            </Text>
            <View style={styles.formSection}>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Gym/Health Club Name"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={styles.input}
                value={this.state.gymName}
                onChangeText={text => this.setState({gymName: text})}
              />
              <TextInput
                autoCapitalize={'none'}
                placeholder="Gym/Health Club Address"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.gymAddress}
                onChangeText={text => this.setState({gymAddress: text})}
              />
              <TextInput
                autoCapitalize={'none'}
                placeholder="City"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.city}
                onChangeText={text => this.setState({city: text})}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput
                  autoCapitalize={'none'}
                  placeholder="State"
                  placeholderTextColor={'rgba(0,0,0,0.5)'}
                  style={[styles.input, {borderTopWidth: 0, width: '50%'}]}
                  value={this.state.state}
                  onChangeText={text => this.setState({state: text})}
                />
                <TextInput
                  autoCapitalize={'none'}
                  placeholder="ZIP"
                  placeholderTextColor={'rgba(0,0,0,0.5)'}
                  style={[
                    styles.input,
                    {borderTopWidth: 0, borderLeftWidth: 0, width: '50%'},
                  ]}
                  value={this.state.zip}
                  onChangeText={text => this.setState({zip: text})}
                />
              </View>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Phone Number"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.phone}
                onChangeText={text => this.setState({phone: text})}
              />
              <TextInput
                autoCapitalize={'none'}
                placeholder="Start Date of Membership (mm/dd/yyyy)"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.startDate}
                onChangeText={text => this.setState({startDate: text})}
              />
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
                onPress={() => navigation.navigate('EnrollmentComplete')}
                style={[
                  styles.button,
                  {backgroundColor: Styles.colors.lightBlue},
                ]}>
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
  text: {
    color: Styles.colors.text,
    marginBottom: 20,
    fontSize: 17,
  },
});
