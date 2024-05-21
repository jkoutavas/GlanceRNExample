import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import HeaderDefault from '../shared/components/HeaderDefault';
import LocationsOptions from './LocationsOptions';
import LocationsMap from './LocationsMap';
import LocationsSearch from './LocationsSearch';

export default class Locations extends Component {
  render() {
    return (
      <Container style={styles.component}>
        <HeaderDefault showBackButton={true} title="Locations" />

        <Content>
          <LocationsSearch />
          <LocationsMap />
          <LocationsOptions />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: '#EFEFF4',
  },
});
