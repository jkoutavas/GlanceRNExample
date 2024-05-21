import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'native-base';

import GlanceIcon from '../../scaffolding/components/GlanceIcon';

import Styles from '../../globalStyles';

export default class Card extends Component {
  render() {
    const {
      lastVisitDate,
      doctor,
      doctorType,
      hospital,
      address1,
      address2,
      phone,
    } = this.props;
    return (
      <View style={styles.view}>
        <View style={styles.date}>
          <View style={{flexDirection: 'row', marginBottom: 15}}>
            <Text style={[styles.dateText, styles.gray]}>Last Visited:</Text>
            <Text style={[styles.dateText, styles.bold]}>{lastVisitDate}</Text>
          </View>
          <View>
            <Text style={styles.large}>{doctor}</Text>
            <Text style={[styles.regular, styles.gray]}>{doctorType}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View
            style={{width: '40%', alignItems: 'center', flexDirection: 'row'}}>
            <GlanceIcon
              name="icon-call"
              style={{fontSize: 35, color: '#FF3201', marginRight: 30}}
            />
            <GlanceIcon
              name="icon-directions"
              style={{fontSize: 35, color: Styles.colors.lightBlue}}
            />
          </View>
          <View>
            <Text style={[styles.regular, styles.bold]}>{hospital}</Text>
            <Text style={[styles.regular, styles.gray]}>{address1}</Text>
            <Text style={[styles.regular, styles.gray]}>{address2}</Text>
            {phone && (
              <Text style={[styles.regular, styles.gray]}>{phone}</Text>
            )}
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
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  date: {
    paddingBottom: 10,
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
  large: {
    fontSize: 18,
    marginBottom: 5,
    // fontWeight: 'bold'
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
