import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content, Text} from 'native-base';
import CheckingBalance from './CheckingBalance';
import CheckingTransactions from './CheckingTransactions';
import HeaderDefault from '../shared/components/HeaderDefault';

export default class Checking extends Component {
  render() {
    return (
      <Container style={styles.component}>
        <HeaderDefault showBackButton={true} title="Checking Account" />

        <Content>
          <CheckingBalance />
          <CheckingTransactions />
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
