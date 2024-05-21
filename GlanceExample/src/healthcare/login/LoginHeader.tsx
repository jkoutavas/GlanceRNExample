import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {Body, Button, Header, Left, Right} from 'native-base';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';

import {Styles} from '../globalStyles';

class LoginHeader extends Component {
  render() {
    return (
      <Header iosBarStyle="light-content" style={styles.component}>
        <Left>
          <Image
            source={require('../../../resources/images/healthcare-logo-white.png')}
            style={{width: 185, height: 54, marginLeft: 20}}
          />
        </Left>

        <Body style={styles.body}></Body>

        <Right>
          {this.props.showHomeButton && (
            <Button
              onPress={() => this.props.navigation.navigate('Home')}
              transparent>
              <GlanceIcon name="icon-home-outline" style={styles.home} />
            </Button>
          )}

          {this.props.showSettingsButton && (
            <Button
              onPress={() => this.props.navigation.navigate('Settings')}
              transparent>
              <GlanceIcon
                name="icon-settings-outline"
                style={styles.settings}
              />
            </Button>
          )}
        </Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: Styles.colors.blue,
    borderBottomColor: Styles.colors.blue,
    height: 105,
  },
  body: {
    flex: 1,
  },
  home: {
    color: '#FFF',
    fontSize: 26,
    marginRight: -5,
  },
  settings: {
    color: '#FFF',
    fontSize: 24,
  },
});

export default withNavigation(LoginHeader);
