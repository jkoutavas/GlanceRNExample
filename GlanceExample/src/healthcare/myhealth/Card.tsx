import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, Text} from 'native-base';

import GlanceIcon from '../../scaffolding/components/GlanceIcon';

import Styles from '../../globalStyles';

export default class Card extends Component {
  render() {
    const {title, author, description, image} = this.props;
    return (
      <View style={styles.view}>
        <View style={{marginRight: 10}}>
          <Image source={image} style={{width: 97, height: 72}} />
        </View>
        <View style={{width: 205}}>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '90%'}}>
              <Text style={styles.regular}>
                By <Text style={styles.author}>{author}</Text>
              </Text>
              <Text style={styles.regular}>{description}</Text>
            </View>
            <View>
              <GlanceIcon
                name="icon-chevron"
                style={{
                  marginTop: 10,
                  transform: [{rotate: '180deg'}],
                  fontSize: 25,
                  color: Styles.colors.lightBlue,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
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
  title: {
    fontSize: 16,
  },
  author: {
    fontSize: 14,
  },
  regular: {
    fontSize: 13,
    color: Styles.colors.text,
    marginTop: 5,
  },
});
