import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';

import GlanceIcon from '../../scaffolding/components/GlanceIcon';

import {Styles} from '../../globalStyles';

export default class Banner extends Component {
  render() {
    const {header, subtext, buttonText, onPress, theme} = this.props;
    let backgroundColor = Styles.colors.blue;
    let textColor = Styles.colors.white;
    let iconColor = Styles.colors.white;
    if (theme === 'light') {
      backgroundColor = Styles.colors.white;
      textColor = Styles.colors.black;
      iconColor = Styles.colors.lightBlue;
    }
    return (
      <View style={[styles.banner, {backgroundColor}]}>
        <View style={{width: '58%'}}>
          <Text style={{color: textColor}}>{header}</Text>
          <Text style={[styles.regular, {color: textColor}]}>{subtext}</Text>
        </View>
        <TouchableOpacity style={styles.bannerButton} onPress={onPress}>
          <Text style={{fontSize: 18, color: textColor}}>{buttonText}</Text>
          <GlanceIcon
            name="icon-register"
            style={{marginLeft: 10, color: iconColor, fontSize: 40}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    zIndex: 1,
    borderTopColor: '#FFFFFF',
    borderTopWidth: 1,
  },
  regular: {
    fontSize: 12,
    marginRight: 30,
  },
  bannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
  },
  view: {
    alignItems: 'center',
    flexGrow: 1,
  },
});
