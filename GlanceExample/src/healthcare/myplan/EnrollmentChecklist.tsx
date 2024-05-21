import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {Container, Content, Text, Button, Icon} from 'native-base';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';

import {Styles} from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

const CHECKLIST = [
  'Personal Information',
  'Household Information',
  'Home/Mail Address',
  'Social Security Number',
  'Employer and Income Information',
  'Proof of Citizenship',
];

export default class EnrollmentChecklist extends Component {
  state = {
    selected: [],
  };

  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }

  checkboxClicked(option) {
    const {selected} = this.state;
    const index = selected.indexOf(option);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(option);
    }
    this.setState({selected});
  }

  render() {
    const {navigation} = this.props;
    const checklistOptions = [];

    CHECKLIST.forEach((option, index) => {
      const checkboxStyles = [styles.checkbox];
      const selected = this.state.selected.indexOf(option) > -1;
      if (selected) {
        checkboxStyles.push(styles.checkboxSelected);
      }
      checklistOptions.push(
        <View key={'checklist_option_' + index} style={styles.option}>
          <Text>{option}</Text>
          <TouchableOpacity onPress={this.checkboxClicked.bind(this, option)}>
            <View style={checkboxStyles}>
              {selected && <Icon name="checkmark" style={styles.icon} />}
            </View>
          </TouchableOpacity>
        </View>,
      );
    });
    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true}></Header>
        <SubHeader color="orange" text="My Plan" />

        <Content contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerSubview}>
              <Text style={styles.headerText}>Enrollment Application</Text>
            </View>
            <Text style={[styles.key, {marginTop: 10}]}>
              New or a change of plan requires you to fill out our application
              form.
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 20}}>Please be prepared</Text>
            <Text
              style={[
                styles.key,
                {marginTop: 10, marginBottom: 25, marginRight: 10},
              ]}>
              Please have these documents and information available to ensure
              this process goes quickly and smoothly:
            </Text>
            {checklistOptions}
          </View>
          <View style={{marginTop: 15}}>
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
                onPress={() => navigation.navigate('EnrollmentApplication')}
                style={[
                  styles.button,
                  {backgroundColor: Styles.colors.orange},
                ]}>
                <Text uppercase={false} style={styles.buttonText}>
                  Continue
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
                  Need application help?
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
    marginBottom: 30,
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
  option: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Styles.colors.border,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 1.5
  },
  checkbox: {
    borderWidth: 2,
    borderColor: '#9B9B9B',
    borderRadius: 100,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: Styles.colors.lightBlue,
  },
  icon: {
    fontSize: Platform.OS === 'ios' ? 32 : 20,
    color: Styles.colors.lightBlue,
  },
  key: {
    color: Styles.colors.text,
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
