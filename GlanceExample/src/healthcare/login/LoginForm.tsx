import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button, Text, List, ListItem, Left, Right, Switch} from 'native-base';

import {connect} from 'react-redux';
import {save_username} from '../../redux/app';

import {placeholderTextColor} from '../../scaffolding/styles/form';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';
import {Styles} from '../globalStyles';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      switch: true,
    };
  }

  signin() {
    this.props.dispatch(save_username(this.state.username));
    this.props.navigation.navigate('HealthcareDrawer');
  }

  render() {
    return (
      <View style={styles.component}>
        <View style={{paddingHorizontal: 20}}>
          <View style={styles.inputHeaderView}>
            <Text style={styles.inputHeader}>Username</Text>
          </View>
          <TextInput
            autoCapitalize={'none'}
            placeholder="Username"
            placeholderTextColor={placeholderTextColor}
            style={styles.input}
            value={this.state.username}
            onChangeText={text => this.setState({username: text})}
          />

          <View style={styles.inputHeaderView}>
            <Text style={styles.inputHeader}>Password</Text>
          </View>
          <TextInput
            autoCapitalize={'none'}
            placeholder="Password"
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={true}
            style={styles.input}
            value={'password'}
          />

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Switch
              value={this.state.switch}
              onValueChange={() => this.setState({switch: !this.state.switch})}
            />
            <Text style={styles.text}>Remember Me</Text>
          </View>

          <Button
            block
            onPress={this.signin.bind(this)}
            style={styles.button}
            elevation={0}>
            <Text uppercase={false}>Sign In</Text>
          </Button>
        </View>

        <List
          style={{
            marginTop: 20,
            borderTopWidth: 1,
            borderTopColor: Styles.colors.border,
          }}>
          <ListItem style={{marginLeft: 0}}>
            <Left>
              <Text style={styles.forgotText}>Forgot Username?</Text>
            </Left>
            <Right>
              <GlanceIcon name="icon-chevron" style={styles.iconChevron} />
            </Right>
          </ListItem>
          <ListItem style={{marginLeft: 0}}>
            <Left>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </Left>
            <Right>
              <GlanceIcon name="icon-chevron" style={styles.iconChevron} />
            </Right>
          </ListItem>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    marginTop: 20,
    width: '100%',
  },
  inputHeaderView: {
    borderBottomWidth: 1,
    borderBottomColor: Styles.colors.border,
    marginBottom: 10,
  },
  inputHeader: {
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#EFEFF4',
    borderRadius: 20,
    fontWeight: '500',
    height: 45,
    marginVertical: 2,
    paddingLeft: 12,
  },
  text: {
    color: '#000',
    fontSize: 12,
    marginLeft: 15,
    marginTop: 5,
  },
  button: {
    backgroundColor: Styles.colors.blue,
    borderRadius: 20,
    height: 46,
    marginTop: 30,
  },
  forgotText: {
    marginLeft: 20,
    fontSize: 13,
  },
  iconChevron: {
    // color: 'white',
    fontSize: 15,
    marginRight: 15,
    transform: [{rotate: '180deg'}],
  },
});

function mapStateToProps(state) {
  const {App} = state;

  return {
    username: App.username,
  };
}
export default connect(mapStateToProps)(LoginForm);
