import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';

export default class YourApplicationSlider extends Component {
  render() {
    return (
      <View style={styles.component}>
        <Image source={require('../../../resources/images/slider.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 18,
  },
});
