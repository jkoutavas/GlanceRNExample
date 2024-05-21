import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import MapView from './MapView';

export default class LocationsMap extends Component {
  render() {
    const initialRegion = {
      latitude: 42.3608,
      latitudeDelta: 0.0922,
      longitude: -71.0588,
      longitudeDelta: 0.0421,
    };

    return (
      <View style={styles.component}>
        <MapView region={initialRegion} style={{flex: 1}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    height: 500,
    width: '100%',
  },
});
