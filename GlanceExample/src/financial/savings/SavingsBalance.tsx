import React, {Component} from 'react';
import {View} from 'react-native';
import {Left, Right, Text} from 'native-base';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';
import * as styles from '../shared/styles/balance';

export default class SavingsBalance extends Component {
  render() {
    return (
      <View style={styles.balance.layout}>
        <Left style={styles.balance.left}>
          <View style={styles.balance.iconBackground}>
            <GlanceIcon
              name="icon-savings"
              style={styles.balance.icon}></GlanceIcon>
          </View>

          <View style={styles.balance.account}>
            <Text style={styles.balance.name}>{`GLOBAL\nSAVINGS`}</Text>

            <Text style={styles.balance.number}>8392</Text>
          </View>
        </Left>

        <Right>
          <Text style={styles.balance.amount}>$6,233.12</Text>

          <Text style={styles.balance.balance}>Available Balance</Text>
        </Right>
      </View>
    );
  }
}
