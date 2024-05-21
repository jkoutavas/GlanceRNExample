import React, {Component} from 'react';
import {NativeModules, StyleSheet, View} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {Button, Spinner, Text} from 'native-base';
import {statuses, startSession} from '../scaffolding/helpers/visitorSession';
import GlanceIcon from '../scaffolding/components/GlanceIcon';

const GlanceBridge = NativeModules.GlanceBridge;
const {VideoOff} = GlanceBridge.getConstants();

class HomeQuickDemo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.component}>
        <Text style={styles.heading}>Quick Demos</Text>

        <View style={styles.container}>
          <View style={styles.containerInner}>
            {this.props.sessionStatus === statuses.stopped && (
              <Button
                onPress={() => {
                  startSession(VideoOff);
                }}
                style={[styles.button]}
                elevation={0}>
                <GlanceIcon
                  name="icon-screenshare"
                  style={styles.browser}></GlanceIcon>

                <Text
                  allowFontScaling={false}
                  style={[styles.text]}
                  uppercase={false}>
                  {`START\nScreen Share`}
                </Text>
              </Button>
            )}

            {this.props.sessionStatus === statuses.connecting && (
              <Button style={[styles.button, styles.buttonAlternate]}>
                <Spinner color="white" />
              </Button>
            )}

            {this.props.sessionStatus === statuses.connected && (
              <Button
                onPress={() => this.props.stopVisitorSession()}
                style={[styles.button, styles.buttonDisabled]}
                elevation={0}>
                <GlanceIcon
                  name="icon-screenshare"
                  style={styles.browser}></GlanceIcon>

                <Text
                  allowFontScaling={false}
                  style={[styles.text]}
                  uppercase={false}>
                  {`END\nScreen Share`}
                </Text>
              </Button>
            )}

            <Button
              onPress={() =>
                this.props.navigation.navigate('TwoWayVideoDialog')
              }
              style={styles.button}
              elevation={0}>
              <GlanceIcon
                name="icon-two-way"
                style={styles.browser}></GlanceIcon>

              <Text
                allowFontScaling={false}
                style={styles.text}
                uppercase={false}>
                {`START\n2-Way Video`}
              </Text>
            </Button>
          </View>
          <View style={styles.containerInner}>
            <Button
              style={styles.button}
              onPress={this.props.showImagePicker}
              elevation={0}>
              <GlanceIcon name="icon-photos" style={styles.photos}></GlanceIcon>

              <Text
                allowFontScaling={false}
                style={styles.text}
                uppercase={false}>
                {`View\nPhotos`}
              </Text>
            </Button>

            <Button
              onPress={this.props.openWebView}
              style={styles.button}
              elevation={0}>
              <GlanceIcon
                name="icon-web-browser"
                style={styles.browser}></GlanceIcon>

              <Text
                allowFontScaling={false}
                style={styles.text}
                uppercase={false}>
                {`Web\nBrowser`}
              </Text>
            </Button>

            {/*<Button
              onPress={() => this.props.navigation.navigate('GlanceMapsView')}
              style={styles.button}
              elevation={0}
            >
              <GlanceIcon
                name='icon-directions'
                style={styles.browser}>
              </GlanceIcon>

              <Text
                allowFontScaling={false}
                style={styles.text}
                uppercase={false}
              >
                {`Google\nMaps`}
              </Text>
            </Button>*/}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  container: {
    flexDirection: 'column',
  },
  containerInner: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#06699B',
    borderRadius: 10,
    flexDirection: 'column',
    height: 86,
    justifyContent: 'center',
    marginHorizontal: 1,
    width: 86,
    marginLeft: 7,
    marginBottom: 7,
  },
  buttonDisabled: {
    backgroundColor: '#9B0606',
  },
  buttonAlternate: {
    backgroundColor: '#FF9500',
  },
  text: {
    width: 110,
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
  },
  textAlternate: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
  photos: {
    color: '#FF9500',
    fontSize: 26,
    marginBottom: 5,
  },
  browser: {
    color: '#FF9500',
    fontSize: 24,
    marginTop: -2,
    marginBottom: 8,
  },
});

export default withNavigation(HomeQuickDemo);
