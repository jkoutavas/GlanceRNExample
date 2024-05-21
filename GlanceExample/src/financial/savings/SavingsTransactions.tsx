import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Left, List, ListItem, Right, Text} from 'native-base';
import Masking from '../../scaffolding/components/Masking';
import * as styles from '../shared/styles/transactions';

export default class SavingsTransactions extends Masking {
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
            <Text style={styles.transaction.status}>02/24/2018</Text>

            <Text style={styles.transaction.name}>MONTHLY MAINTENANCE FEE</Text>
          </Left>

          <Right style={styles.transaction.right}>
            <Text style={styles.transaction.amount}>$3,476.97</Text>
          </Right>
        </ListItem>

        <ListItem style={styles.transaction.base}>
          <Left style={styles.transaction.left}>
            <Text style={styles.transaction.status}>02/24/2018</Text>

            <Text style={styles.transaction.name}>
              ONLINE BANKING TRFER FROM CHK
            </Text>
          </Left>

          <Right style={styles.transaction.right}>
            <Text style={styles.transaction.amount}>$43.95</Text>
          </Right>
        </ListItem>

        <ListItem style={styles.transaction.base}>
          <Left style={styles.transaction.left}>
            <Text style={styles.transaction.status}>02/20/2018</Text>

            <Text style={styles.transaction.name}>
              MOBILE APP CHECK DESPOSIT
            </Text>
          </Left>

          <Right style={styles.transaction.right}>
            <Text style={styles.transaction.amount}>$1,230.00</Text>
          </Right>
        </ListItem>

        <ListItem style={styles.transaction.base}>
          <Left style={styles.transaction.left}>
            <Text style={styles.transaction.status}>02/20/2018</Text>

            <Text style={styles.transaction.name}>Deposit Check #334</Text>
          </Left>

          <Right style={styles.transaction.right}>
            <Text style={styles.transaction.amount}>$100.10</Text>
          </Right>
        </ListItem>

        <ListItem style={styles.transaction.base}>
          <Left style={styles.transaction.left}>
            <Text style={styles.transaction.status}>02/17/2018</Text>

            <Text style={styles.transaction.name}>
              Transfer to Checking ID: XXX445667
            </Text>
          </Left>

          <Right style={styles.transaction.right}>
            <Text style={styles.transaction.amount}>-500.00</Text>
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
              <Text style={styles.transaction.amount}>01113243101</Text>
            )}
          </Right>
        </ListItem>
      </List>
    );
  }
}
