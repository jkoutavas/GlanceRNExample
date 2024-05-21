import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Text, Button, Icon} from 'native-base';

import RadioButton from '../../scaffolding/components/RadioButton';
import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';

import Styles from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

export default class EnrollmentApplication extends Component {
  state = {};

  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }

  render() {
    const {navigation} = this.props;
    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true}></Header>
        <SubHeader color="orange" text="My Plan" />

        <Content contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerSubview}>
              <Text style={styles.headerText}>Enrollment Application</Text>
            </View>
          </View>
          <View style={styles.form}>
            <Text style={styles.formHeader}>About Yourself</Text>
            <View style={styles.formSection}>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Full Name"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={styles.input}
                value={this.state.fullName}
                onChangeText={text =>
                  this.setState({fullName: text})
                }></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Home Address"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.homeAddress}
                onChangeText={text =>
                  this.setState({homeAddress: text})
                }></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="City"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.city}
                onChangeText={text => this.setState({city: text})}></TextInput>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput
                  autoCapitalize={'none'}
                  placeholder="State"
                  placeholderTextColor={'rgba(0,0,0,0.5)'}
                  style={[styles.input, {borderTopWidth: 0, width: '50%'}]}
                  value={this.state.state}
                  onChangeText={text =>
                    this.setState({state: text})
                  }></TextInput>
                <TextInput
                  autoCapitalize={'none'}
                  placeholder="ZIP"
                  placeholderTextColor={'rgba(0,0,0,0.5)'}
                  style={[
                    styles.input,
                    {borderTopWidth: 0, borderLeftWidth: 0, width: '50%'},
                  ]}
                  value={this.state.zip}
                  onChangeText={text => this.setState({zip: text})}></TextInput>
              </View>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Phone Number"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.phone}
                onChangeText={text => this.setState({phone: text})}></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Email Address"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.email}
                onChangeText={text => this.setState({email: text})}></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Date of Birth (mm/dd/yyyy)"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.startDate}
                onChangeText={text =>
                  this.setState({startDate: text})
                }></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Social Security Number"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.ssn}
                onChangeText={text => this.setState({ssn: text})}></TextInput>
              <View style={{flexDirection: 'row', marginVertical: 20}}>
                <Text style={styles.questionText}>Sex</Text>
                <RadioButton
                  isSelected={this.state.sex === 'male'}
                  onPress={() => this.setState({sex: 'male'})}
                  outerColor={'#9B9B9B'}
                  borderWidthMultiplier={0.2}
                />
                <Text style={styles.answerText}>Male</Text>
                <RadioButton
                  isSelected={this.state.sex === 'female'}
                  onPress={() => this.setState({sex: 'female'})}
                  outerColor={'#9B9B9B'}
                  borderWidthMultiplier={0.2}
                />
                <Text style={styles.answerText}>Female</Text>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 0}}>
                <Text style={styles.questionText}>Are you a U.S. citizen?</Text>
                <RadioButton
                  isSelected={this.state.citizen === 'yes'}
                  onPress={() => this.setState({citizen: 'yes'})}
                  outerColor={'#9B9B9B'}
                  borderWidthMultiplier={0.2}
                />
                <Text style={styles.answerText}>Yes</Text>
                <RadioButton
                  isSelected={this.state.citizen === 'no'}
                  onPress={() => this.setState({citizen: 'no'})}
                  outerColor={'#9B9B9B'}
                  borderWidthMultiplier={0.2}
                />
                <Text style={styles.answerText}>No</Text>
              </View>
            </View>
            <Text style={styles.formHeader}>Current Job & Income</Text>
            <View style={styles.formSection}>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Employer Name"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={styles.input}
                value={this.state.employerName}
                onChangeText={text =>
                  this.setState({fullName: text})
                }></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Employer Address"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.workAddress}
                onChangeText={text =>
                  this.setState({workAddress: text})
                }></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="City"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.workCity}
                onChangeText={text =>
                  this.setState({workCity: text})
                }></TextInput>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput
                  autoCapitalize={'none'}
                  placeholder="State"
                  placeholderTextColor={'rgba(0,0,0,0.5)'}
                  style={[styles.input, {borderTopWidth: 0, width: '50%'}]}
                  value={this.state.workState}
                  onChangeText={text =>
                    this.setworkState({state: text})
                  }></TextInput>
                <TextInput
                  autoCapitalize={'none'}
                  placeholder="ZIP"
                  placeholderTextColor={'rgba(0,0,0,0.5)'}
                  style={[
                    styles.input,
                    {borderTopWidth: 0, borderLeftWidth: 0, width: '50%'},
                  ]}
                  value={this.state.workZip}
                  onChangeText={text =>
                    this.setState({workZip: text})
                  }></TextInput>
              </View>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Employer Phone Number"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {borderTopWidth: 0}]}
                value={this.state.workPhone}
                onChangeText={text =>
                  this.setState({workPhone: text})
                }></TextInput>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Wages/tips (before taxes)"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={[styles.input, {marginTop: 20}]}
                value={this.state.wages}
                onChangeText={text => this.setState({wages: text})}></TextInput>
              <View style={{marginTop: 20}}>
                <Text style={styles.questionText}>
                  In the past year, did you:
                </Text>
                <View style={styles.radio}>
                  <RadioButton
                    isSelected={this.state.pastYear === 'stop_working'}
                    onPress={() => this.setState({pastYear: 'stop_working'})}
                    outerColor={'#9B9B9B'}
                    borderWidthMultiplier={0.2}
                  />
                  <Text style={styles.answerText}>Stop Working</Text>
                </View>
                <View style={styles.radio}>
                  <RadioButton
                    isSelected={this.state.pastYear === 'change_jobs'}
                    onPress={() => this.setState({pastYear: 'change_jobs'})}
                    outerColor={'#9B9B9B'}
                    borderWidthMultiplier={0.2}
                  />
                  <Text style={styles.answerText}>Change Jobs</Text>
                </View>
                <View style={styles.radio}>
                  <RadioButton
                    isSelected={this.state.pastYear === 'fewer_hours'}
                    onPress={() => this.setState({pastYear: 'fewer_hours'})}
                    outerColor={'#9B9B9B'}
                    borderWidthMultiplier={0.2}
                  />
                  <Text style={styles.answerText}>
                    Start working fewer hours
                  </Text>
                </View>
                <View style={styles.radio}>
                  <RadioButton
                    isSelected={this.state.pastYear === 'none'}
                    onPress={() => this.setState({pastYear: 'none'})}
                    outerColor={'#9B9B9B'}
                    borderWidthMultiplier={0.2}
                  />
                  <Text style={styles.answerText}>None of these</Text>
                </View>
              </View>
            </View>
            <Text style={styles.formHeader}>Your Health Coverage</Text>
            <View
              style={[
                styles.formSection,
                {paddingBottom: 20, marginBottom: 0},
              ]}>
              <Text style={styles.questionText}>
                Are you enrolled in health coverage now from the following?
              </Text>
              <View style={styles.radio}>
                <RadioButton
                  isSelected={this.state.enrolled === 'yes'}
                  onPress={() => this.setState({enrolled: 'yes'})}
                  outerColor={'#9B9B9B'}
                  borderWidthMultiplier={0.2}
                />
                <Text style={styles.answerText}>
                  Yes. If yes, check which coverage you have:
                </Text>
              </View>
              <View style={{marginLeft: 35}}>
                <View style={styles.radio}>
                  <RadioButton
                    isSelected={this.state.coverage === 'global_healthcare'}
                    onPress={() =>
                      this.setState({
                        coverage: 'global_healthcare',
                        enrolled: 'yes',
                      })
                    }
                    outerColor={'#9B9B9B'}
                    borderWidthMultiplier={0.2}
                  />
                  <Text style={styles.answerText}>Global Healthcare</Text>
                </View>
                <View style={styles.radio}>
                  <RadioButton
                    isSelected={this.state.coverage === 'chip'}
                    onPress={() =>
                      this.setState({coverage: 'chip', enrolled: 'yes'})
                    }
                    outerColor={'#9B9B9B'}
                    borderWidthMultiplier={0.2}
                  />
                  <Text style={styles.answerText}>CHIP</Text>
                </View>
                <View style={styles.radio}>
                  <RadioButton
                    isSelected={this.state.coverage === 'medicare'}
                    onPress={() =>
                      this.setState({coverage: 'medicare', enrolled: 'yes'})
                    }
                    outerColor={'#9B9B9B'}
                    borderWidthMultiplier={0.2}
                  />
                  <Text style={styles.answerText}>Medicare</Text>
                </View>
                <View style={styles.radio}>
                  <RadioButton
                    isSelected={this.state.coverage === 'tricare'}
                    onPress={() =>
                      this.setState({coverage: 'tricare', enrolled: 'yes'})
                    }
                    outerColor={'#9B9B9B'}
                    borderWidthMultiplier={0.2}
                  />
                  <Text style={styles.answerText}>TRICARE</Text>
                </View>
                <View style={styles.radio}>
                  <RadioButton
                    isSelected={this.state.coverage === 'peace_corps'}
                    onPress={() =>
                      this.setState({coverage: 'peace_corps', enrolled: 'yes'})
                    }
                    outerColor={'#9B9B9B'}
                    borderWidthMultiplier={0.2}
                  />
                  <Text style={styles.answerText}>Peace Corps</Text>
                </View>
                <View style={styles.radio}>
                  <RadioButton
                    isSelected={this.state.coverage === 'va'}
                    onPress={() =>
                      this.setState({coverage: 'va', enrolled: 'yes'})
                    }
                    outerColor={'#9B9B9B'}
                    borderWidthMultiplier={0.2}
                  />
                  <Text style={styles.answerText}>VA health care program</Text>
                </View>
                <View style={styles.radio}>
                  <RadioButton
                    isSelected={this.state.coverage === 'other'}
                    onPress={() =>
                      this.setState({coverage: 'other', enrolled: 'yes'})
                    }
                    outerColor={'#9B9B9B'}
                    borderWidthMultiplier={0.2}
                  />
                  <Text style={styles.answerText}>Other</Text>
                </View>
              </View>
              <View style={styles.radio}>
                <RadioButton
                  isSelected={this.state.enrolled === 'no'}
                  onPress={() =>
                    this.setState({enrolled: 'no', coverage: null})
                  }
                  outerColor={'#9B9B9B'}
                  borderWidthMultiplier={0.2}
                />
                <Text style={styles.answerText}>No.</Text>
              </View>
              <TouchableOpacity>
                <View style={styles.signature}>
                  <Text style={styles.signatureText}>
                    Tap to add your Electronic Signature
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={styles.footerText}>
                See our Patient Privacy Statement
              </Text>
            </TouchableOpacity>
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
                onPress={() => navigation.navigate('MyPlanEnrollmentComplete')}
                style={[
                  styles.button,
                  {backgroundColor: Styles.colors.orange},
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
                  Need enrollment help?
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
    marginHorizontal: 15,
    paddingBottom: 50,
  },
  header: {
    marginHorizontal: 5,
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
  footerText: {
    color: Styles.colors.blue,
    fontSize: 17,
    marginTop: 10,
    marginBottom: 20,
  },
  formSection: {
    borderBottomColor: Styles.colors.border,
    borderBottomWidth: 1,
    paddingBottom: 50,
    marginBottom: 20,
  },
  formHeader: {
    fontSize: 19,
    marginBottom: 15,
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
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
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
  signature: {
    height: 80,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    backgroundColor: '#EFEFF4',
  },
  signatureText: {
    fontSize: 17,
    color: 'rgba(0,0,0,0.5)',
  },
  button: {
    width: 140,
    height: 50,
    borderRadius: 23,
    backgroundColor: Styles.colors.blue,
  },
  orange: {
    backgroundColor: Styles.colors.orange,
  },
  blue: {
    backgroundColor: Styles.colors.blue,
  },
  buttonText: {
    width: '100%',
    fontSize: 20,
    textAlign: 'center',
  },
});
