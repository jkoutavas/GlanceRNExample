import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';
import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';

import {Styles} from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

export default class EnrollmentComplete extends Component {
  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }

  render() {
    const {navigation} = this.props;
    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true} />
        <SubHeader color="orange" text="My Plan" />

        <Content contentContainerStyle={styles.content}>
          <Text style={{fontSize: 25, marginBottom: 20}}>Thank you!</Text>
          <Text
            style={{fontSize: 17, marginBottom: 20, color: Styles.colors.text}}>
            We will review your application and contact you with any questions
            or addtional information needs.
          </Text>
          <Button
            elevation={0}
            onPress={() => navigation.navigate('MyPlan')}
            style={styles.button}>
            <Text uppercase={false} style={styles.buttonText}>
              Back to My Plan
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: Styles.colors.white,
  },
  content: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 50,
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 23,
    backgroundColor: Styles.colors.orange,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },
});
