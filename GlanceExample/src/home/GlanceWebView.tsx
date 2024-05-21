import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

export default class GlanceWebView extends Component {
  render() {
    const uri = this.props.uri || 'https://ww2.glance.net';
    return <WebView useWebKit={true} source={{uri}} />;
  }
}
