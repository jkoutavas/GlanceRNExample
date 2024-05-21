import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'native-base';

import GlanceIcon from '../../scaffolding/components/GlanceIcon';

import Styles from '../../globalStyles';

export default class Card extends Component {
  render() {
    const {
      lastFillDate,
      medicationName,
      dosage,
      doctor,
      refills = 0,
    } = this.props;

    let refillText = '';
    if (refills > 0) {
      refillText = refills + ' refill';
      if (refills > 1) {
        refillText += 's';
      }
      refillText += ' remaining';
    }
    return (
      <View style={styles.view}>
        <View style={styles.date}>
          <Text style={[styles.dateText, styles.gray]}>Last Date of Fill:</Text>
          <Text style={[styles.dateText, styles.bold]}>{lastFillDate}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{width: '50%'}}>
            <Text style={styles.medication}>{medicationName}</Text>
            <Text style={[styles.regular, styles.gray]}>Dosage: {dosage}</Text>
            <Text style={[styles.regular, styles.gray]}>{refillText}</Text>
          </View>
          <View>
            <Text style={styles.medication}>&nbsp;</Text>
            <Text style={[styles.regular, styles.bold]}>{doctor}</Text>
            <Text style={[styles.regular, styles.gray]}>Provider</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    // height: 112,
    // marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  date: {
    flexDirection: 'row',
    paddingBottom: 5,
    borderBottomColor: Styles.colors.border,
    borderBottomWidth: 1,
  },
  dateText: {
    fontSize: 13,
    marginRight: 5,
  },
  medication: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  regular: {
    fontSize: 13,
  },
  gray: {
    color: Styles.colors.text,
  },
  bold: {
    fontWeight: 'bold',
  },
});
