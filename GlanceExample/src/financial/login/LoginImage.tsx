import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';

export default class LoginImage extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Image
          source={require('../../../resources/images/glass-windows.png')}
          style={styles.image}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    borderBottomColor: '#197441',
    borderBottomWidth: 5,
    width: '100%',
  },
  image: {
    width: '100%',
  },
});
