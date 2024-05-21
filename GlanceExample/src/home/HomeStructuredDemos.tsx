import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {Button, Text} from 'native-base';
import GlanceIcon from '../scaffolding/components/GlanceIcon';

class HomeStructuredDemos extends Component {
  render() {
    return (
      <View style={styles.component}>
        <Text style={styles.heading}>Structured Demos</Text>

        <Button
          block
          onPress={() => this.props.navigation.navigate('FinancialLogin')}
          style={styles.button}
          elevation={0}>
          <GlanceIcon name="icon-banking" style={styles.icon}></GlanceIcon>

          <Text uppercase={false} style={styles.text}>
            Financial App
          </Text>

          <GlanceIcon
            name="icon-chevron"
            style={styles.iconChevron}></GlanceIcon>
        </Button>

        <Button
          block
          onPress={() => this.props.navigation.navigate('HealthcareLogin')}
          style={styles.button}
          elevation={0}>
          <GlanceIcon name="icon-medical" style={styles.icon}></GlanceIcon>

          <Text uppercase={false} style={styles.text}>
            Healthcare App
          </Text>

          <GlanceIcon
            name="icon-chevron"
            style={styles.iconChevron}></GlanceIcon>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconChevron: {
    color: 'white',
    fontSize: 15,
    marginRight: 15,
    transform: [{rotate: '180deg'}],
  },
  component: {
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#06699B',
    borderRadius: 0,
    height: 85,
    justifyContent: 'space-between',
    marginTop: 2,
    paddingHorizontal: 5,
  },
  inactive: {
    opacity: 0.5,
  },
  icon: {
    color: '#FF9500',
    fontSize: 40,
    marginLeft: 15,
  },
  text: {
    fontSize: 20,
  },
});

export default withNavigation(HomeStructuredDemos);
