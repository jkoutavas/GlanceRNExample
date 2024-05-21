import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'native-base';

export default class FinancialOpenAccountContent extends Component {
  render() {
    return (
      <View style={styles.component}>
        <Text style={styles.primary}>
          Build an online brokerage account with Global Investments and build a
          sound strategy for your future.
        </Text>

        <Text style={styles.secondary} allowFontScaling={false}>
          Apply for a new brokerage account and experience the convenience of
          online account management. Conduct live in-app guided advice with your
          financial advisor to build your investments and manage your growth.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    paddingHorizontal: 20,
  },
  primary: {
    color: '#4A4A4A',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 30,
  },
  secondary: {
    color: '#4A4A4A',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
    height: 120,
  },
});
