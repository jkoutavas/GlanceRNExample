import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {Button, Header, Left, Text} from 'native-base';

export default class GlanceMapsHeader extends React.Component {
  render() {
    return (
      <Header iosBarStyle="light-content" style={styles.header}>
        <Left>
          <Button onPress={this.props.close} transparent>
            <Text uppercase={false} style={styles.text}>
              Close
            </Text>
          </Button>
        </Left>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#33ABE2',
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
  },
  text: {
    color: '#FFFFFF',
  },
  title: {
    color: '#FFFFFF',
    width: Platform.OS === 'ios' ? '150%' : '100%',
  },
});
