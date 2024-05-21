import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Left, List, ListItem, Right, Text} from 'native-base';
import Masking from '../../scaffolding/components/Masking';
import * as styles from '../shared/styles/transactions';

export default class CheckingTransactions extends Masking {
  state = {
    showAccountNumber: false,
  };

  render() {
    return (
      <List style={styles.list.background}>
        <ListItem itemDivider style={styles.divider.base}>
          <Text style={styles.divider.text}>RECENT TRANSACTIONS</Text>
        </ListItem>

        <ListItem style={styles.transaction.base}>
          <Left style={styles.transaction.left}>
            <Text style={styles.transaction.status}>Processing</Text>

            <Text style={styles.transaction.name}>CAPTURED DEPOSIT</Text>
          </Left>

          <Right style={styles.transaction.right}>
            <Text style={styles.transaction.amount}>$3,476.97</Text>
          </Right>
        </ListItem>

        <ListItem style={styles.transaction.base}>
          <Left style={styles.transaction.left}>
            <Text style={styles.transaction.name}>PAYPAL INST XFER</Text>
          </Left>

          <Right style={styles.transaction.right}>
            <Text style={styles.transaction.amount}>$43.95</Text>
          </Right>
        </ListItem>

        <ListItem style={styles.transaction.base}>
          <Left style={styles.transaction.left}>
            <Text style={styles.transaction.name}>GLOBAL INVEST: AUTH PMT</Text>
          </Left>

          <Right style={styles.transaction.right}>
            <Text style={styles.transaction.amount}>$1,230.00</Text>
          </Right>
        </ListItem>

        <ListItem style={styles.transaction.base}>
          <Left style={styles.transaction.left}>
            <Text style={styles.transaction.name}>
              CREDITCARD: MIKE'S FOOD AND FUEL
            </Text>
          </Left>

          <Right style={styles.transaction.right}>
            <Text style={styles.transaction.amount}>$30.00</Text>
          </Right>
        </ListItem>

        <ListItem style={styles.transaction.base}>
          <Left style={styles.transaction.left}>
            <Text style={styles.transaction.name}>
              CREDITCARD: RICH & TOM'S FINE CUISINE: ARLIG-MA
            </Text>
          </Left>

          <Right style={styles.transaction.right}>
            <Text style={styles.transaction.amount}>$269.60</Text>
          </Right>
        </ListItem>

        <ListItem style={styles.transaction.base}>
          <Left style={styles.transaction.left}>
            <Text style={styles.transaction.name}>
              DIRECT DEPOSIT ID:XXXX637888
            </Text>
          </Left>

          <Right style={styles.transaction.right}>
            <Text style={styles.transaction.amount}>$510.10</Text>
          </Right>
        </ListItem>

        <ListItem itemDivider style={styles.divider.base}>
          <Text style={styles.divider.text}>ACCOUNT DETAILS</Text>
        </ListItem>

        <ListItem style={styles.transaction.base}>
          <Left style={styles.transaction.left}>
            <Text style={styles.transaction.name}>Account Number</Text>
          </Left>

          <Right nativeID="masked" style={styles.transaction.right}>
            {!this.state.showAccountNumber && (
              <TouchableOpacity
                onPress={() => this.setState({showAccountNumber: true})}>
                <Text style={styles.transaction.mask}>VIEW</Text>
              </TouchableOpacity>
            )}

            {this.state.showAccountNumber && (
              <Text style={styles.transaction.amount}>01116493101</Text>
            )}
          </Right>
        </ListItem>

        <ListItem style={styles.transaction.base}>
          <Left style={styles.transaction.left}>
            <Text style={styles.transaction.name}>ROUTING Numbers</Text>
          </Left>

          <Right style={styles.transaction.right}>
            <Text style={styles.transaction.amount}>0110000000</Text>

            <Text style={styles.transaction.amount}>01110000101</Text>
          </Right>
        </ListItem>
      </List>
    );
  }
}
