import React, {Component} from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {Text, Button, Header, Left, Right, Body} from 'native-base';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';

import {Styles} from '../../globalStyles';

class SubHeader extends Component {
  render() {
    const {color, text} = this.props;
    let mainTextColor = Styles.colors.white;
    if (color === 'white') {
      mainTextColor = Styles.colors.blue;
    }
    return (
      <Header
        style={[styles.component, {backgroundColor: Styles.colors[color]}]}>
        <Left>
          <Button
            onPress={() => {
              this.props.navigation.pop();
            }}
            transparent
            elevation={0}>
            <GlanceIcon name="icon-chevron" style={styles.iconChevron} />
            <Text uppercase={false} style={styles.back}>
              Back
            </Text>
          </Button>
        </Left>
        <Body>
          <Text style={[styles.mainText, {color: mainTextColor}]}>{text}</Text>
        </Body>
        <Right>
          <Button
            onPress={() => this.props.navigation.navigate('HealthcareMain')}
            transparent>
            <GlanceIcon name="icon-home-outline" style={styles.homeIcon} />
          </Button>
        </Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    height:
      Platform.OS === 'ios' && Dimensions.get('window').width >= 375 ? 45 : 45,
    paddingTop: -20,
    paddingHorizontal: 20,
    // marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    width: Platform.OS === 'ios' ? '100%' : '150%',
    color: '#fff',
    fontSize: 17,
    marginLeft: 5,
    marginTop: Platform.OS === 'android' ? 3 : 0,
  },
  mainText: {
    fontSize: 22,
    width: Platform.OS === 'ios' ? '200%' : '150%',
    textAlign: 'center',
  },
  icon: {
    color: '#fff',
  },
  homeIcon: {
    fontSize: 24,
    color: '#fff',
  },
  iconChevron: {
    color: 'white',
    fontSize: 25,
  },
});

export default withNavigation(SubHeader);
