import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
// import MapView from 'react-native-maps';

import Header from './GlanceMapsHeader';

export default class GlanceMapsView extends Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  onRegionChange(region) {
    // this.setState({ region });
  }

  close() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.containerOuter}>
        <Header close={this.close.bind(this)} />
        <View style={styles.container}>
          {/*<MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange.bind(this)}
            style={styles.map}
          />*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerOuter: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    height: Dimensions.get('window').height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
