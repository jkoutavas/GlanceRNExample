import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import HeaderDefault from '../shared/components/HeaderDefault';
import SavingsBalance from './SavingsBalance';
import SavingsTransactions from './SavingsTransactions';

export default class Savings extends Component {
  render() {
    return (
      <Container style={styles.component}>
        <HeaderDefault showBackButton={true} title="Savings Account" />

        <Content>
          <SavingsBalance />
          <SavingsTransactions />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: '#EFEFF4',
  },
});
