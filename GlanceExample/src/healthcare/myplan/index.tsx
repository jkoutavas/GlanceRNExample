import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Text, Button} from 'native-base';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

import Styles from '../../globalStyles';

class MyPlan extends Component {
  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }
  render() {
    const {plans, currentPlan} = this.props;
    const plan = plans.filter(p => p.name === currentPlan)[0];
    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true}></Header>
        <SubHeader color="orange" text="My Plan" />

        <Content contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerSubview}>
              <Text style={styles.headerText}>Current Plan</Text>
            </View>
          </View>
          <View>
            <View style={styles.row}>
              <Text style={styles.planName}>
                Global Health Shield {currentPlan}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Percentage of Cost</Text>
              <Text style={styles.value}>{plan.costPercentage}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Number of Plans</Text>
              <Text style={styles.value}>{plan.numPlans}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Monthly Premium</Text>
              <Text style={styles.value}>{plan.premium}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Copayment</Text>
              <Text style={styles.value}>{plan.copay}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Deductible</Text>
              <Text style={styles.value}>{plan.deductible}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Max Out of Pocket</Text>
              <Text style={styles.value}>{plan.outOfPocketMax}</Text>
            </View>
          </View>
          <View>
            <Button
              elevation={0}
              onPress={() => this.props.navigation.navigate('ChangePlan')}
              style={[styles.button, styles.orange]}>
              <Text uppercase={false} style={styles.buttonText}>
                Change your plan
              </Text>
            </Button>
            <Button
              elevation={0}
              onPress={() => this.props.navigation.navigate('CustomerService')}
              style={[styles.button, styles.blue]}>
              <Text uppercase={false} style={styles.buttonText}>
                Need help with your plan?
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

// name: 'Bronze',
// costPercentage: '60%',
// numPlans: '23',
// premium: '$221',
// copay: '$80',
// deductible: '$3,000',
// outOfPocketMax: '$10,000'

function mapStateToProps(state) {
  const {Healthcare} = state;

  return {
    plans: Healthcare.plans,
    currentPlan: Healthcare.currentPlan,
  };
}
export default connect(mapStateToProps)(MyPlan);

const styles = StyleSheet.create({
  component: {
    backgroundColor: Styles.colors.white,
  },
  content: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 50,
  },
  header: {
    marginBottom: 30,
  },
  headerSubview: {
    borderBottomColor: Styles.colors.border,
    borderBottomWidth: 1,
  },
  headerText: {
    color: Styles.colors.blue,
    fontSize: 22,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Styles.colors.border,
    paddingBottom: 15,
    marginBottom: 15,
  },
  planName: {
    fontWeight: 'bold',
  },
  key: {
    color: Styles.colors.text,
    lineHeight: 24,
  },
  value: {
    color: Styles.colors.blue,
    fontSize: 20,
  },
  button: {
    flex: 1,
    width: 310,
    height: 46,
    borderRadius: 23,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  orange: {
    backgroundColor: Styles.colors.orange,
  },
  blue: {
    backgroundColor: Styles.colors.blue,
  },
  buttonText: {
    width: '100%',
    fontSize: 20,
    textAlign: 'center',
  },
});
