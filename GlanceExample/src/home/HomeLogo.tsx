import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import GlanceIcon from '../scaffolding/components/GlanceIcon';

export default class HomeLogo extends Component {
  render() {
    return (
      <View syle={styles.component}>
        <GlanceIcon name="logo-glance-new" style={styles.icon}></GlanceIcon>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    height: 100,
  },
  icon: {
    color: '#FFF',
    fontSize: 80,
  },
});
