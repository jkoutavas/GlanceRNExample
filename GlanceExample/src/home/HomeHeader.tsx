import React, {Component} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {Body, Button, Header, Left, Right, Title, Text} from 'native-base';
import GlanceIcon from '../scaffolding/components/GlanceIcon';

import {signalPresence} from '../scaffolding/helpers/visitorSession';

class HomeHeader extends Component {
  render() {
    const settingsIconStyles = [styles.icon];
    if (this.props.showHomeButton) {
      settingsIconStyles.push(styles.iconAlternate);
    }
    const titleStyles = [styles.title];
    const cancelButtonStyles = [styles.cancelButton];
    const cancelTextStyles = [styles.cancelText];
    if (Platform.OS === 'android' && this.props.showBackButton) {
      titleStyles.push(styles.titleLeftVisible);
      cancelButtonStyles.push(styles.cancelButtonAndroid);
      cancelTextStyles.push(styles.cancelTextAndroid);
    }
    return (
      <Header iosBarStyle="light-content" style={styles.component}>
        <Left>
          {this.props.showBackButton && (
            <Button
              onPress={() => {
                signalPresence('[Main] Home View');
                this.props.navigation.popToTop();
              }}
              style={cancelButtonStyles}
              transparent>
              <Text style={cancelTextStyles}>Cancel</Text>
            </Button>
          )}
        </Left>

        <Body>
          <Title style={titleStyles}>{this.props.text || 'Home'}</Title>
        </Body>

        <Right>
          {this.props.showHomeButton && (
            <Button
              onPress={() => this.props.navigation.popToTop()}
              transparent>
              <GlanceIcon name="icon-home-outline" style={styles.icon} />
            </Button>
          )}

          <Button
            onPress={() => this.props.navigation.navigate('Settings')}
            style={styles.button}
            transparent>
            <GlanceIcon
              name={'icon-settings-outline'}
              style={settingsIconStyles}
            />
          </Button>
        </Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: '#33ABE2',
    borderBottomColor: '#288FBE',
    borderBottomWidth: 1,
    paddingLeft: 0,
  },
  title: {
    color: '#FFF',
  },
  titleLeftVisible: {
    paddingLeft: 20,
  },
  cancelButton: {
    justifyContent: 'flex-start',
    marginLeft: 12,
  },
  cancelButtonAndroid: {
    width: 70,
    height: '100%',
  },
  cancelText: {
    color: '#FFF',
  },
  cancelTextAndroid: {
    fontSize: 9,
  },
  icon: {
    color: '#FFF',
    fontSize: 24,
  },
  iconAlternate: {
    color: '#06699B',
  },
});

export default withNavigation(HomeHeader);
