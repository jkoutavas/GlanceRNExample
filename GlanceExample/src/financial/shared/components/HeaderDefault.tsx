import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {Body, Button, Header, Left, Right, Title} from 'native-base';
import GlanceIcon from '../../../scaffolding/components/GlanceIcon';

class HeaderDefault extends Component {
  render() {
    return (
      <Header iosBarStyle="light-content" style={styles.component}>
        <GlanceIcon name="global-logo" style={styles.globe} />

        <Left>
          {this.props.showBackButton && (
            <Button
              onPress={() => this.props.navigation.popToTop()}
              transparent>
              <GlanceIcon name="icon-chevron" style={styles.iconChevron} />
            </Button>
          )}
        </Left>

        <Body style={styles.body}>
          <Title style={styles.title}>{this.props.title}</Title>
        </Body>

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
    backgroundColor: '#215C3B',
    borderBottomColor: '#215C3B',
    overflow: 'hidden',
  },
  body: {
    flex: 2,
  },
  globe: {
    color: '#197441',
    fontSize: 360,
    left: -6,
    top: 12,
    position: 'absolute',
  },
  icon: {
    color: '#FFF',
  },
  title: {
    color: '#FFF',
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
  iconChevron: {
    color: '#FFF',
    fontSize: 20,
  },
});

export default withNavigation(HeaderDefault);
