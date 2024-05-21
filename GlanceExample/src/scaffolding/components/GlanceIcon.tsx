import React, {Component} from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import config from '../../../resources/fonts/selection.json';

const IconSet = createIconSetFromIcoMoon(config, 'icomoon', 'glance-icons.ttf');

export default class GlanceIcon extends Component {
  render() {
    return <IconSet name={this.props.name} style={this.props.style}></IconSet>;
  }
}
