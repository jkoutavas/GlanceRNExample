import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'native-base';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';

export default class LoginHeading extends Component {
  render() {
    return (
      <View style={styles.component}>
        <GlanceIcon name="global-logo" style={styles.icon}></GlanceIcon>

        <Text style={styles.text}>Global Investments</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  icon: {
    color: '#197441',
    fontSize: 36,
    marginTop: 2,
  },
  text: {
    color: '#4A4A4A',
    fontSize: 20,
    marginLeft: 10,
  },
});
