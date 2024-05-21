import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import {startSession} from '../../scaffolding/helpers/visitorSession';
import HeaderModal from '../shared/components/HeaderModal';
import TopicsList from './TopicsList';
import TopicsOptions from './TopicsOptions';

export default class Topics extends Component {
  render() {
    return (
      <Container style={styles.component}>
        <HeaderModal theme="green" title="Help"></HeaderModal>

        <Content>
          <TopicsList />

          <TopicsOptions startSession={startSession}></TopicsOptions>
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
