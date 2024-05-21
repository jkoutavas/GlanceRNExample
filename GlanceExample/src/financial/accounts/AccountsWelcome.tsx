import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'native-base';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';
import CONSTANTS from '../../utils/constants';

export default class AccountsWelcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'Glance User',
    };
  }

  componentDidMount() {
    this.getUsername();
  }

  async getUsername() {
    let username = await AsyncStorage.getItem(CONSTANTS.Settings.USERNAME);
    if (username != null) {
      this.setState({username: username});
    }
  }

  render() {
    return (
      <View style={styles.component}>
        <View style={styles.background}>
          <GlanceIcon name="icon-hello" style={styles.icon}></GlanceIcon>
        </View>

        <Text style={styles.text}>Hello, {this.state.username}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 20,
    width: '100%',
  },
  background: {
    alignItems: 'center',
    backgroundColor: '#EFEFF4',
    borderRadius: 17,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  icon: {
    color: '#197441',
    fontSize: 21,
    marginLeft: 3,
  },
  text: {
    color: '#215C3B',
    fontSize: 19,
    fontWeight: '600',
    marginLeft: 10,
  },
});
