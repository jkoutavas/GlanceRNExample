import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {Icon, Left, List, ListItem, Right, Text} from 'native-base';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';

class AccountsList extends Component {
  render() {
    return (
      <View style={styles.component}>
        <List style={styles.list}>
          <ListItem itemDivider style={styles.divider}>
            <GlanceIcon name="global-logo" style={styles.icon}></GlanceIcon>

            <Text style={styles.title}>GLOBAL INVESTMENT ACCOUNTS</Text>
          </ListItem>

          <ListItem
            onPress={() => this.props.navigation.navigate('Checking')}
            style={styles.account}>
            <Left>
              <Text style={styles.name}>Global Checking - 1234</Text>
            </Left>

            <Right style={styles.right}>
              <Text allowFontScaling={false} style={styles.amount}>
                $10,156
              </Text>

              <GlanceIcon
                name="icon-chevron"
                style={styles.iconChevron}></GlanceIcon>
            </Right>
          </ListItem>

          <ListItem
            onPress={() => this.props.navigation.navigate('Savings')}
            style={styles.account}>
            <Left>
              <Text style={styles.name}>Global Savings - 8392</Text>
            </Left>

            <Right style={styles.right}>
              <Text allowFontScaling={false} style={styles.amount}>
                $12,987
              </Text>
              <GlanceIcon
                name="icon-chevron"
                style={styles.iconChevron}></GlanceIcon>
            </Right>
          </ListItem>

          <ListItem itemDivider style={styles.divider} />

          <ListItem
            onPress={() => this.props.navigation.navigate('OpenAccount')}
            style={styles.account}>
            <Left>
              <Text style={styles.name}>Open a Brokerage Account</Text>
            </Left>

            <Right style={styles.right}>
              <GlanceIcon
                name="icon-chevron"
                style={styles.iconChevron}></GlanceIcon>
            </Right>
          </ListItem>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    marginTop: 25,
  },
  list: {
    backgroundColor: '#FFF',
  },
  divider: {
    alignItems: 'center',
    backgroundColor: '#EFEFF4',
    flexDirection: 'row',
    height: 38,
    paddingHorizontal: 15,
  },
  icon: {
    color: '#197441',
    fontSize: 17,
  },
  title: {
    color: '#5D5D60',
    fontSize: 13,
    marginLeft: 8,
  },
  account: {
    borderBottomColor: '#D6D5DB',
    borderBottomWidth: 1,
  },
  name: {
    color: '#0051A8',
    fontSize: 17,
    marginLeft: 0,
  },
  amount: {
    color: '#197441',
    fontSize: 17,
    marginRight: 12,
  },
  right: {
    alignItems: 'center',
    flexDirection: 'row',
    flexBasis: 6,
    justifyContent: 'flex-end',
  },
  add: {
    color: '#0051A8',
    height: 20,
    width: 20,
  },
  iconChevron: {
    color: '#9B9B9B',
    transform: [{rotate: '180deg'}],
  },
});

export default withNavigation(AccountsList);
