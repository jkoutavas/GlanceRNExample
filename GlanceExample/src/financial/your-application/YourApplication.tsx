import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import HeaderModal from '../shared/components/HeaderModal';
import YourApplicationForm from './YourApplicationForm';
import YourApplicationHeading from './YourApplicationHeading';
import YourApplicationHelp from './YourApplicationHelp';
import YourApplicationSlider from './YourApplicationSlider';
import YourApplicationTitle from './YourApplicationTitle';

export default class YourApplication extends Component {
  render() {
    return (
      <Container style={styles.component}>
        <HeaderModal theme="blue" title="Your Application" />

        <YourApplicationHelp />

        <Content>
          <YourApplicationHeading />
          <YourApplicationSlider />
          <YourApplicationTitle />
          <YourApplicationForm navigation={this.props.navigation} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: '#F3F2F2',
  },
});
