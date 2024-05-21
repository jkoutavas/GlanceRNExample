import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {Button, Text} from 'native-base';

import GlanceIcon from '../../scaffolding/components/GlanceIcon';

import Styles from '../../globalStyles';

export default class Card extends Component {
  render() {
    const {
      title,
      color,
      icon,
      buttonText,
      subtextBold,
      subtextNumber,
      subtext,
      onClick,
    } = this.props;
    const globalColor = Styles.colors[color];
    return (
      <View elevation={5}>
        <TouchableOpacity
          style={styles.view}
          onPress={() => this.props.navigation.navigate(onClick)}>
          <View style={styles.cardTop}>
            <GlanceIcon
              name={icon}
              style={{fontSize: 30, color: globalColor}}
            />
            <Text style={styles.mainText}>{title}</Text>
          </View>
          <View style={styles.cardMiddle}>
            {!!subtextBold && (
              <Text style={styles.subtextBold}>{subtextBold}:</Text>
            )}
            {!!subtextNumber && (
              <Text style={[styles.subtextNumber, {color: globalColor}]}>
                {subtextNumber}
              </Text>
            )}
            <Text style={styles.subtext}>{subtext}</Text>
          </View>
          <View style={styles.cardBottom}>
            <Button
              block
              onPress={() => this.props.navigation.navigate(onClick)}
              style={[styles.button, {backgroundColor: Styles.colors[color]}]}
              elevation={0}>
              <Text
                uppercase={false}
                uppercase={false}
                style={styles.buttonText}>
                {buttonText}
              </Text>
            </Button>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexGrow: 1,
    backgroundColor: '#FFF',
    width: Dimensions.get('window').width < 375 ? 140 : 167,
    maxWidth: Dimensions.get('window').width < 375 ? 140 : 167,
    height: Dimensions.get('window').width < 375 ? 141 : 158,
    margin: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: 10,
    width: '100%',
    height: '40%',
    // backgroundColor: 'red'
  },
  cardMiddle: {
    // paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Styles.colors.border,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: '30%',
  },
  cardBottom: {
    marginTop: 10,
    // backgroundColor: 'green'
  },
  mainText: {
    fontSize: Dimensions.get('window').width < 375 ? 14 : 17,
    fontWeight: '500',
    marginLeft: 10,
    paddingRight: 10,
  },
  subtext: {
    fontSize: 12,
    marginRight: 10,
  },
  subtextBold: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtextNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 10,
  },
  button: {
    minWidth: 125,
    height: 30,
    borderRadius: 14,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
