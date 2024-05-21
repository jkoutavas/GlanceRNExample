import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {Body, Button, Header, Left, Right, Text, Title} from 'native-base';
import GlanceIcon from '../../../scaffolding/components/GlanceIcon';

class HeaderModal extends Component {
  render() {
    return (
      <Header
        iosBarStyle="light-content"
        style={[
          styles.component,
          this.props.theme === 'blue' && styles.backgroundBlue,
          this.props.theme === 'green' && styles.backgroundGreen,
        ]}>
        <GlanceIcon
          name="global-logo"
          style={[
            styles.globe,
            this.props.theme === 'blue' && styles.globeBlue,
            this.props.theme === 'green' && styles.globeGreen,
          ]}
        />

        <Left style={styles.left}>
          <Button
            onPress={() => this.props.navigation.goBack(null)}
            transparent>
            <Text style={styles.text}>Cancel</Text>
          </Button>
        </Left>

        <Body style={styles.body}>
          <Title style={styles.title}>{this.props.title}</Title>
        </Body>

        <Right />
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    overflow: 'hidden',
  },
  backgroundBlue: {
    backgroundColor: '#225B9F',
    borderBottomColor: '#215C3B',
  },
  backgroundGreen: {
    backgroundColor: '#215C3B',
    borderBottomColor: '#215C3B',
  },
  left: {
    zIndex: 10,
  },
  text: {
    color: '#FFFFFF',
  },
  globe: {
    fontSize: 360,
    left: -6,
    top: 12,
    position: 'absolute',
  },
  globeBlue: {
    color: '#2C76C4',
  },
  globeGreen: {
    color: '#197441',
  },
  title: {
    color: '#FFFFFF',
    width: 138,
  },
});

export default withNavigation(HeaderModal);
