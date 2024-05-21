import React, {Component} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

export default class AppointmentCalendar extends Component {
  render() {
    return (
      <Calendar
        onDayPress={day => {
          console.log('selected day', day);
        }}
        style={{
          height: 350,
        }}
        theme={{
          'stylesheet.calendar.main': {
            week: {
              alignItems: 'center',
              flexDirection: 'row',
            },
          },
          'stylesheet.calendar.header': {
            arrowImage: {
              tintColor: '#215C3B',
            },
            monthText: {
              color: '#000000',
              fontSize: 23,
              fontWeight: '400',
              margin: 15,
            },
            dayHeader: {
              color: '#454545',
              fontSize: 15,
              fontWeight: '600',
              marginTop: 2,
              marginBottom: 7,
              textAlign: 'center',
              width: 32,
            },
          },
          'stylesheet.day.basic': {
            base: {
              alignItems: 'center',
              height: 52,
              justifyContent: 'center',
              width: 52,
            },
            text: {
              color: '#454545',
              fontSize: 13,
              fontWeight: '500',
            },
            todayText: {
              alignItems: 'center',
              backgroundColor: '#197441',
              color: '#FFF',
              flexDirection: 'row',
              fontWeight: '700',
              height: 48,
              lineHeight: 48,
              textAlign: 'center',
              width: 48,
            },
          },
        }}
      />
    );
  }
}
