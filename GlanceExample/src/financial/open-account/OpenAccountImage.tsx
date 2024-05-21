import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';

export default class FinancialOpenAccountImage extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Image
          source={require('../../../resources/images/market.png')}
          style={styles.image}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    borderBottomColor: '#2C76C4',
    borderBottomWidth: 5,
    width: '100%',
  },
  image: {
    width: '100%',
  },
});
