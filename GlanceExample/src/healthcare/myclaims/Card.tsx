import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Text} from 'native-base';

import GlanceIcon from '../../scaffolding/components/GlanceIcon';

import {Styles} from '../globalStyles';

class Card extends Component {
  render() {
    const {dateOfService, hospital, doctor, amountCovered, amountOwed} =
      this.props;
    return (
      <View style={styles.view}>
        <View style={styles.date}>
          <View style={{flexDirection: 'row', marginBottom: 15}}>
            <Text style={[styles.dateText, styles.gray]}>Date of Service:</Text>
            <Text style={[styles.dateText, styles.bold]}>{dateOfService}</Text>
          </View>
          <View>
            <Text style={styles.large}>{hospital}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View>
              <Text style={[styles.regular, styles.bold]}>
                {this.props.username}
              </Text>
              <Text style={[styles.regular, styles.gray]}>Subscriber</Text>
            </View>
            <View>
              <Text style={[styles.regular, styles.bold]}>{doctor}</Text>
              <Text style={[styles.regular, styles.gray]}>Provider</Text>
            </View>
            <View>
              <GlanceIcon
                name="icon-chevron"
                style={[styles.iconChevron, styles.green]}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View>
            <Text style={[styles.regular, styles.gray]}>Amount Covered:</Text>
            <Text style={styles.regular}>{amountCovered}</Text>
          </View>
          <View>
            <Text style={[styles.regular, styles.gray]}>Amount Owed:</Text>
            <Text style={styles.regular}>{amountOwed}</Text>
          </View>
          <View>
            <Text style={[styles.regular, styles.gray]}>Status:</Text>
            <Text style={[styles.regular, styles.green]}>Completed</Text>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {App} = state;

  return {
    username: App.username,
  };
}
export default connect(mapStateToProps)(Card);

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
  green: {
    color: Styles.colors.green,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  iconChevron: {
    color: 'white',
    fontSize: 15,
    marginRight: 15,
    transform: [{rotate: '180deg'}],
  },
});
