import React, {Component} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {withNavigation} from '@react-navigation/compat';
import {Button, Text} from 'native-base';
import {placeholderTextColor} from '../../scaffolding/styles/form';
import {signalFinancialPresence} from '../../scaffolding/helpers/visitorSession';
import CONSTANTS from '../../utils/constants';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'Glance User',
    };
  }

  componentDidMount() {
    this.getUsername();
    signalFinancialPresence(this.constructor.name);
  }

  async getUsername() {
    let username = await AsyncStorage.getItem(CONSTANTS.Settings.USERNAME);
    if (username != null) {
      this.setState({username: username});
    }
  }

  async signin() {
    await AsyncStorage.setItem(
      CONSTANTS.Settings.USERNAME,
      this.state.username,
    );
    this.props.navigation.navigate('MainAccounts');
  }

  render() {
    return (
      <View style={styles.component}>
        <TextInput
          autoCapitalize={'none'}
          placeholder="Username"
          placeholderTextColor={placeholderTextColor}
          style={styles.input}
          value={this.state.username}
          onChangeText={text => this.setState({username: text})}
        />

        <TextInput
          autoCapitalize={'none'}
          placeholder="Password"
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={true}
          style={styles.input}
          value={'password'}
        />

        <TouchableOpacity>
          <Text style={styles.text}>Forgot Name or Passcode?</Text>
        </TouchableOpacity>

        <Button block onPress={this.signin.bind(this)} style={styles.button}>
          <Text>Sign In</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    marginTop: 40,
    width: 280,
  },
  input: {
    backgroundColor: '#EFEFF4',
    borderRadius: 2,
    fontWeight: '500',
    height: 40,
    marginVertical: 2,
    paddingLeft: 12,
  },
  text: {
    color: '#007AFF',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 0,
    height: 40,
    marginTop: 40,
  },
});

export default withNavigation(LoginForm);
