import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import AccountsWelcome from './AccountsWelcome';
import AccountsList from './AccountsList';
import HeaderDefault from '../shared/components/HeaderDefault';

export default class Accounts extends Component {
  render() {
    return (
      <Container style={styles.component}>
        <HeaderDefault
          showHomeButton={true}
          showSettingsButton={true}
          title="Accounts"></HeaderDefault>

        <Content>
          <AccountsWelcome />
          <AccountsList />
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
