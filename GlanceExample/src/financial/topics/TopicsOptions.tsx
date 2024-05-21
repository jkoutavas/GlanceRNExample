import React, {Component} from 'react';
import {
  NativeModules,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {Text} from 'native-base';
import {startSession} from '../../scaffolding/helpers/visitorSession';

const GlanceBridge = NativeModules.GlanceBridge;
const {VideoOff} = GlanceBridge.getConstants();

class TopicsOptions extends Component {
  render() {
    return (
      <View style={styles.component}>
        <TouchableOpacity
          onPress={() => {
            startSession(VideoOff);
          }}
          style={styles.option}>
          <View style={styles.background}>
            <Image source={require('../../../resources/images/support.png')} />
          </View>

          <Text style={styles.text}>Call Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Appointment')}
          style={styles.option}>
          <View style={styles.background}>
            <Image source={require('../../../resources/images/calendar.png')} />
          </View>

          <Text style={styles.text}>{'Schedule an\nAppointment'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Locations')}
          style={styles.option}>
          <View style={styles.background}>
            <Image source={require('../../../resources/images/location.png')} />
          </View>

          <Text style={styles.text}>Find Locations</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 55,
    paddingHorizontal: 26,
  },
  option: {
    alignItems: 'center',
  },
  background: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 37,
    height: 74,
    justifyContent: 'center',
    width: 74,
  },
  text: {
    color: '#0051A8',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 12,
    textAlign: 'center',
  },
});

export default withNavigation(TopicsOptions);
