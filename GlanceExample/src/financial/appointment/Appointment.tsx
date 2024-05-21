import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content, Text} from 'native-base';
import HeaderDefault from '../shared/components/HeaderDefault';
import AppointmentCalendar from './AppointmentCalendar';
import AppointmentSchedule from './AppointmentSchedule';

export default class Appointment extends Component {
  render() {
    return (
      <Container style={styles.component}>
        <HeaderDefault showBackButton={true} title="Appointment" />

        <Content>
          <View style={styles.question}>
            <Text style={styles.questionText}>
              When would you like to meet?
            </Text>
          </View>

          <AppointmentCalendar />

          <View style={styles.notice}>
            <Text style={styles.noticeText}>
              You can make an appointment up to 12 months in advance.
            </Text>
          </View>

          <AppointmentSchedule />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: '#EFEFF4',
  },
  question: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DBDAE0',
    flexDirection: 'row',
    marginTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 18,
  },
  questionText: {
    color: '#5D5D60',
    fontSize: 16,
  },
  notice: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#DBDAE0',
    padding: 18,
    paddingTop: 5,
  },
  noticeText: {
    color: '#5D5D60',
    fontSize: 15,
  },
});
