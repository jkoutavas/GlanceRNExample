import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Text} from 'native-base';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';
import {startSession} from '../../scaffolding/helpers/visitorSession';

export default class YourApplicationHelp extends Component {
  render() {
    return (
      <View style={styles.component}>
        <GlanceIcon name="global-logo" style={styles.icon}></GlanceIcon>

        <Text style={styles.title} allowFontScaling={false}>
          Global Investments Brokerage
        </Text>

        <TouchableOpacity onPress={startSession}>
          <Text style={styles.help} allowFontScaling={false}>
            Need Help?
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    height: 53,
    paddingHorizontal: 15,
  },
  icon: {
    color: '#225B9F',
    fontSize: 26,
  },
  title: {
    color: '#5D5D60',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
    marginRight: 'auto',
  },
  help: {
    color: '#0051A8',
    fontSize: 14,
    fontWeight: '500',
  },
});
