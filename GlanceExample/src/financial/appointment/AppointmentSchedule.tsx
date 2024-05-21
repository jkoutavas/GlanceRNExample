import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'native-base';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';

export default class AppointmentSchedule extends Component {
  render() {
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <View style={styles.component}>
        <Text style={styles.heading}>
          Your meeting is scheduled for {date} with Sharon Foster at:
        </Text>

        <View style={styles.section}>
          <View style={styles.iconContainer}>
            <GlanceIcon name="icon-location" style={styles.icon} />
          </View>

          <View>
            <Text style={styles.title}>Global Investments</Text>

            <Text style={styles.content}>
              {`29686 Stevens Creek Blvd\nCupertino, CA 95014`}
            </Text>
          </View>
        </View>

        <View style={[styles.section, styles.action]}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../resources/images/add-calendar.png')}
              style={styles.calendar}
            />
          </View>

          <Text style={styles.title}>Add to Calendar</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    padding: 20,
  },
  heading: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '600',
  },
  section: {
    flexDirection: 'row',
    marginTop: 20,
  },
  iconContainer: {
    width: 35,
  },
  icon: {
    color: '#D0021B',
    fontSize: 25,
  },
  calendar: {
    marginLeft: -2,
  },
  title: {
    color: '#5D5D60',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    color: '#5D5D60',
    fontSize: 14,
  },
  action: {
    alignItems: 'center',
  },
});
