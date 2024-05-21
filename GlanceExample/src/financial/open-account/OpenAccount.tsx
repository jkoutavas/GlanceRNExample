import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content} from 'native-base';
import {startSession} from '../../scaffolding/helpers/visitorSession';
import HeaderModal from '../shared/components/HeaderModal';
import OpenAccountApply from './OpenAccountApply';
import OpenAccountContent from './OpenAccountContent';
import OpenAccountHeading from './OpenAccountHeading';
import OpenAccountImage from './OpenAccountImage';

export default class OpenAccount extends Component {
  render() {
    return (
      <Container style={styles.component}>
        <HeaderModal theme="blue" title="Open an Account" />

        <Content contentContainerStyle={styles.content}>
          <View style={styles.view}>
            <OpenAccountImage />
            <OpenAccountHeading />
            <OpenAccountContent />

            <OpenAccountApply startSession={startSession} />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexGrow: 1,
  },
  view: {
    alignItems: 'center',
    flexGrow: 1,
  },
});
