import React, {Component} from 'react';
import {NativeModules} from 'react-native';

const Glance = NativeModules.Glance;

export default class Masking extends Component {
  componentDidMount() {
    Glance.maskViews();
    this.maskViews();
  }

  componentDidUpdate(nextProps, nextState) {
    Glance.maskViews();
    this.maskViews();
  }

  maskViews = async () => {
    const isRunning = await Glance.isRunning();

    if (isRunning) {
      setTimeout(Glance.maskViews, 10);
    }
  };
}
