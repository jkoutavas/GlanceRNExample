import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Footer, FooterTab, Text} from 'native-base';
import GlanceIcon from '../../../scaffolding/components/GlanceIcon';

export default class FinancialFooter extends Component {
  render() {
    return (
      <Footer style={styles.footer}>
        <FooterTab>
          <Button style={styles.button} transparent>
            <GlanceIcon
              name="icon-bank-accounts"
              style={[styles.icon, styles.active]}></GlanceIcon>

            <Text allowFontScaling={false} style={[styles.text, styles.active]}>
              Accounts
            </Text>
          </Button>

          <Button
            onPress={() => this.props.navigation.navigate('Login')}
            style={styles.button}
            transparent>
            <GlanceIcon
              name="icon-logout"
              style={[styles.icon, styles.logout]}></GlanceIcon>

            <Text allowFontScaling={false} style={styles.text}>
              Log Out
            </Text>
          </Button>

          <Button
            onPress={() => this.props.navigation.navigate('OpenAccount')}
            style={styles.button}
            transparent>
            <GlanceIcon
              name="icon-investments-chart"
              style={styles.icon}></GlanceIcon>

            <Text allowFontScaling={false} style={styles.text}>
              Investments
            </Text>
          </Button>

          <Button
            onPress={() => this.props.navigation.navigate('Help')}
            style={styles.button}
            transparent>
            <GlanceIcon name="icon-help" style={styles.icon}></GlanceIcon>

            <Text allowFontScaling={false} style={styles.text}>
              Help
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: -3,
  },
  footer: {
    backgroundColor: '#215C3B',
  },
  icon: {
    color: '#C7C7CC',
    fontSize: 24,
  },
  text: {
    color: '#C7C7CC',
    fontSize: 11,
    marginTop: 3,
  },
  active: {
    color: '#F5A623',
  },
  logout: {
    fontSize: 23,
    marginTop: 1,
  },
});
