import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'native-base';

export default class YourApplicationTitle extends Component {
  render() {
    return (
      <View style={styles.component}>
        <Text style={styles.title}>Primary applicant</Text>

        <View style={styles.subtitle}>
          <Text style={styles.text}>Personal Information</Text>

          <Text style={styles.required}>* Required</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    paddingHorizontal: 20,
  },
  title: {
    color: '#225B9F',
    fontSize: 22,
    fontWeight: '600',
  },
  subtitle: {
    alignItems: 'flex-end',
    borderColor: '#61C6F4',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    paddingBottom: 5,
  },
  text: {
    color: '#225B9F',
    fontSize: 18,
    fontWeight: '500',
  },
  required: {
    color: '#4A4A4A',
    fontSize: 13,
  },
});
