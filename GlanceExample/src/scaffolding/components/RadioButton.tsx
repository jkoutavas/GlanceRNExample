import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

const DEFAULT_SIZE_MULTIPLIER = 0.7;
const DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER = 0.1;

export default class RadioButton extends Component {
  static defaultProps = {
    size: 13,
    innerColor: '#359BE0',
    outerColor: '#E6E8ED',
    borderWidthMultiplier: DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER,
    isSelected: false,
    onPress: () => null,
  };

  render() {
    const {
      label,
      size,
      innerColor,
      outerColor,
      borderWidthMultiplier,
      isSelected,
      onPress,
    } = this.props;

    const borderColor = isSelected ? innerColor : outerColor;

    const style = {
      borderColor,
      backgroundColor: '#FFF',
      width: size + size * DEFAULT_SIZE_MULTIPLIER,
      height: size + size * DEFAULT_SIZE_MULTIPLIER,
      borderRadius: (size + size * DEFAULT_SIZE_MULTIPLIER) / 2,
      borderWidth: size * borderWidthMultiplier,
    };
    if (isSelected) {
      style.borderWidth *= 2.5;
    }

    return (
      <View style={styles.radioView}>
        <TouchableOpacity style={[styles.radio, style]} onPress={onPress} />
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radioView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  label: {
    marginLeft: 5,
    marginRight: 10,
  },
});
