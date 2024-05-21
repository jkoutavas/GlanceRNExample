import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'native-base';

export default class YourApplicationHeading extends Component {
  render() {
    return (
      <View style={styles.component}>
        <Text style={styles.text}>Your Application</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    alignItems: 'center',
    backgroundColor: '#2C76C4',
    flexDirection: 'row',
    height: 39,
    paddingHorizontal: 16,
  },
  text: {
    color: '#FFF',
    fontSize: 19,
    fontWeight: '400',
  },
});
