import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {Button, Text} from 'native-base';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';

class FinancialOpenAccountApply extends Component {
  render() {
    return (
      <View style={styles.component}>
        <Button
          block
          onPress={() => this.props.navigation.navigate('YourApplication')}
          style={styles.button}>
          <Text>Apply Now</Text>
        </Button>

        <TouchableOpacity onPress={this.props.startSession}>
          <View style={styles.help}>
            <GlanceIcon
              name="icon-customer-support"
              style={styles.icon}></GlanceIcon>

            <View style={styles.text}>
              <Text style={styles.primary}>Need Help?</Text>

              <Text style={styles.secondary}>Start an In-App Visual Call</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    marginTop: 30,
    paddingHorizontal: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#2C76C4',
    borderRadius: 8,
    height: 50,
    width: '100%',
  },
  help: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 8,
    backgroundColor: '#177340',
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 28,
  },
  text: {
    marginLeft: 10,
  },
  primary: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
  },
  secondary: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default withNavigation(FinancialOpenAccountApply);
