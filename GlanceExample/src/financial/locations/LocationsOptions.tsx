import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Segment, Text} from 'native-base';

export default class LocationsOptions extends Component {
  state = {
    selected: 'all',
  };
  render() {
    const {selected} = this.state;
    return (
      <View style={styles.component}>
        <Segment>
          <CustomButton
            first={true}
            selected={selected === 'all'}
            label="ALL"
            onPress={() => this.setState({selected: 'all'})}
          />

          <CustomButton
            selected={selected === 'atms'}
            label="ATMs"
            onPress={() => this.setState({selected: 'atms'})}
          />

          <CustomButton
            last={true}
            selected={selected === 'centers'}
            label="Financial Centers"
            onPress={() => this.setState({selected: 'centers'})}
          />
        </Segment>
      </View>
    );
  }
}

class CustomButton extends Component {
  render() {
    const {selected, onPress, label, first, last} = this.props;
    const buttonStyles = [styles.button];
    let textStyle = styles.inactiveText;
    if (last) {
      buttonStyles.push(styles.last);
    }
    if (selected) {
      buttonStyles.push(styles.active);
      textStyle = styles.activeText;
    }
    return (
      <Button first={first} last={last} style={buttonStyles} onPress={onPress}>
        <Text allowFontScaling={false} style={textStyle}>
          {label}
        </Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    borderColor: '#C7C6CC',
    borderTopWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderColor: '#197441',
  },
  last: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  active: {
    backgroundColor: '#197441',
  },
  activeText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  inactiveText: {
    color: '#197441',
    fontSize: 13,
  },
});
