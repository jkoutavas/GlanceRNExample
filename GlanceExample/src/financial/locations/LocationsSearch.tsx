import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Input, Item} from 'native-base';

export default class LocationsSearch extends Component {
  render() {
    return (
      <View style={styles.component}>
        <Item rounded style={styles.item}>
          <Icon name="ios-search" size={18} style={styles.icon}></Icon>

          <Input
            style={styles.input}
            placeholder="Enter ZIP Code or City, State"
            placeholderTextColor={'#8E8E93'}></Input>
        </Item>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    alignItems: 'center',
    borderColor: '#C7C6CC',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 62,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  item: {
    borderRadius: 10,
    backgroundColor: '#D7D7DC',
    paddingLeft: 6,
  },
  icon: {
    color: '#8E8E93',
    fontSize: 17,
    marginTop: 2,
  },
  input: {
    height: 36,
    marginTop: -2,
    paddingLeft: 0,
  },
});
