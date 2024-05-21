import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {Body, Button, Header} from 'native-base';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';
import {signalPresence} from '../../scaffolding/helpers/visitorSession';

import {Styles} from '../../globalStyles';

class HealthcareHeader extends Component {
  render() {
    return (
      <Header
        iosBarStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        style={styles.component}>
        <Body style={styles.body}>
          <View style={styles.buttons}>
            {this.props.showHomeButton && (
              <Button
                onPress={() => {
                  signalPresence('[Main] Home View');
                  this.props.navigation.navigate('Home');
                }}
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
          </View>
          <View
            style={{
              backgroundColor: Styles.colors.white,
              height: 75,
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('HealthcareMain')}>
              <Image
                source={require('../../../resources/images/healthcare-logo-blue.png')}
                style={{width: 174, height: 52, marginLeft: 20}}
              />
            </TouchableOpacity>
            <View style={styles.rightSide}>
              <Button
                onPress={() =>
                  this.props.navigation.navigate('CustomerService')
                }
                transparent>
                <GlanceIcon name="icon-customer-support" style={styles.icon} />
              </Button>
              <Button
                onPress={() => this.props.navigation.openDrawer()}
                transparent>
                <GlanceIcon name="drawer" style={styles.iconDrawer} />
              </Button>
            </View>
          </View>
        </Body>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: Styles.colors.white,
    borderBottomColor: Styles.colors.border,
    borderBottomWidth: 1,
    height: 140,
  },
  body: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    backgroundColor: Styles.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Styles.colors.border,
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
  },
  rightSide: {
    width: Dimensions.get('window').width < 375 ? '35%' : '45%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  home: {
    color: '#A1B2C1',
    fontSize: 26,
    marginRight: -5,
  },
  settings: {
    color: '#A1B2C1',
    fontSize: 24,
    marginLeft: 25,
    marginRight: 10,
  },
  icon: {
    color: '#979797',
    fontSize: Dimensions.get('window').width < 375 ? 25 : 30,
    marginLeft: 3,
    marginRight: 20,
  },
  iconDrawer: {
    color: '#979797',
    fontSize: Dimensions.get('window').width < 375 ? 15 : 20,
  },
});

export default withNavigation(HealthcareHeader);
