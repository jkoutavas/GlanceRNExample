import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'native-base';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';

export default class FinancialOpenAccountHeading extends Component {
  render() {
    return (
      <View style={styles.component}>
        <GlanceIcon name="global-logo" style={styles.icon} />

        <Text style={styles.text}>
          {'Global Investments\nBrokerage Account'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 25,
    paddingHorizontal: 20,
    width: '100%',
  },
  icon: {
    color: '#197441',
    fontSize: 36,
  },
  text: {
    color: '#225B9F',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 20,
    marginLeft: 14,
    marginTop: 4,
  },
});
