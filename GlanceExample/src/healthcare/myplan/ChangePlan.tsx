import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Text, Button} from 'native-base';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';

import {Styles} from '../../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';
import GlanceIcon from '../../scaffolding/components/GlanceIcon';

class ChangePlan extends Component {
  state = {
    selectedPlan: this.props.currentPlan,
  };

  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }

  render() {
    const {plans, navigation} = this.props;
    // main column
    const mainColumn = (
      <View style={styles.mainColumn}>
        <View style={styles.columnTextViewMain}>
          <Text style={[styles.columnText, {color: Styles.colors.black}]}>
            Plan Category
          </Text>
        </View>
        <View style={[styles.columnTextViewMain, styles.darkMainColumn]}>
          <Text style={styles.columnText}>Percentage of Cost</Text>
        </View>
        <View style={[styles.columnTextViewMain]}>
          <Text style={styles.columnText}>Number of Plans</Text>
        </View>
        <View style={[styles.columnTextViewMain, styles.darkMainColumn]}>
          <Text style={styles.columnText}>Monthly Premium</Text>
        </View>
        <View style={[styles.columnTextViewMain]}>
          <Text style={styles.columnText}>Copayment</Text>
        </View>
        <View style={[styles.columnTextViewMain, styles.darkMainColumn]}>
          <Text style={styles.columnText}>Deductible</Text>
        </View>
        <View style={[styles.columnTextViewMain]}>
          <Text style={styles.columnText}>Out of Pocket Maximum</Text>
        </View>
        <View style={[styles.columnTextViewMain, styles.darkMainColumn]}>
          <Text style={styles.columnText}>Select Plan</Text>
        </View>
      </View>
    );

    // select columns
    let selectColumns = [];
    plans
      .slice(0)
      .reverse()
      .forEach((plan, index) => {
        const columnStyles = [styles.selectColumn];
        const columnRowStyles = [styles.columnTextViewSelect];
        const darkColumnStyles = [
          styles.columnTextViewSelect,
          styles.darkSelectColumn,
        ];
        const checkboxStyles = [styles.checkbox];
        const selected = plan.name === this.state.selectedPlan;

        const textStyle = selected
          ? styles.columnTextSelected
          : styles.columnText;

        if (selected) {
          columnStyles.push(styles.selected);
          darkColumnStyles.push(styles.selectedDark);
          checkboxStyles.push(styles.checkboxSelected);
        }
        selectColumns.push(
          <TouchableOpacity
            key={'select_column_' + index}
            style={columnStyles}
            activeOpacity={0.4}
            onPress={() => this.setState({selectedPlan: plan.name})}>
            <View>
              <View style={[columnRowStyles, styles.first]}>
                <Text style={textStyle}>{plan.name}</Text>
              </View>
              <View style={darkColumnStyles}>
                <Text style={textStyle}>{plan.costPercentage}</Text>
              </View>
              <View style={columnRowStyles}>
                <Text style={textStyle}>{plan.numPlans}</Text>
              </View>
              <View style={darkColumnStyles}>
                <Text style={textStyle}>{plan.premium}</Text>
              </View>
              <View style={columnRowStyles}>
                <Text style={textStyle}>{plan.copay}</Text>
              </View>
              <View style={darkColumnStyles}>
                <Text style={textStyle}>{plan.deductible}</Text>
              </View>
              <View style={columnRowStyles}>
                <Text style={textStyle}>{plan.outOfPocketMax}</Text>
              </View>
              <View style={[darkColumnStyles, styles.last]}>
                <View style={checkboxStyles}>
                  {selected && (
                    <GlanceIcon name="icon-checkmark" style={styles.icon} />
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>,
        );
      });

    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true}></Header>
        <SubHeader color="orange" text="My Plan" />

        <Content contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerSubview}>
              <Text style={styles.headerText}>Change Your Current Plan</Text>
            </View>
            <Text style={[styles.key, {marginTop: 10}]}>
              Your choice of plan dictates how you and the plan share the cost
              of care. Below is a side-by-side comparison of all the plans.
            </Text>
          </View>
          <View style={styles.columns}>
            {mainColumn}
            {selectColumns}
          </View>
          <View style={{marginTop: 15}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Button
                elevation={0}
                onPress={() => navigation.pop()}
                style={[
                  styles.button,
                  {backgroundColor: Styles.colors.darkGray},
                ]}>
                <Text uppercase={false} style={styles.buttonText}>
                  Cancel
                </Text>
              </Button>
              <Button
                elevation={0}
                onPress={() => navigation.navigate('EnrollmentChecklist')}
                style={[
                  styles.button,
                  {backgroundColor: Styles.colors.orange},
                ]}>
                <Text uppercase={false} style={styles.buttonText}>
                  Enroll
                </Text>
              </Button>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,
              }}>
              <Button
                elevation={0}
                onPress={() => navigation.navigate('CustomerService')}
                style={[styles.button, {width: 300}]}>
                <Text uppercase={false} style={styles.buttonText}>
                  Need help filing a claim?
                </Text>
              </Button>
            </View>
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
export default connect(mapStateToProps)(ChangePlan);

const styles = StyleSheet.create({
  component: {
    backgroundColor: Styles.colors.white,
  },
  content: {
    marginTop: 20,
    marginHorizontal: 15,
    paddingBottom: 50,
  },
  header: {
    marginHorizontal: 5,
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
  columns: {
    flexDirection: 'row',
  },
  mainColumn: {
    flex: 0.4,
  },
  selectColumn: {
    flex: 0.22,
    backgroundColor: '#EEEEEE',
    marginRight: 2,
    borderRadius: 23,
  },
  columnTextViewMain: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  columnTextViewSelect: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  first: {
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
  },
  last: {
    marginBottom: 20,
  },
  selected: {
    backgroundColor: '#30A9E0',
  },
  selectedDark: {
    backgroundColor: '#2EA0D5',
  },
  darkMainColumn: {
    backgroundColor: '#F6F5F5',
  },
  darkSelectColumn: {
    backgroundColor: '#E5E4E4',
  },
  columnTextSelected: {
    fontSize: 14,
    fontWeight: '500',
    color: Styles.colors.white,
  },
  columnText: {
    fontSize: 14,
    fontWeight: '500',
    color: Styles.colors.text,
  },
  checkbox: {
    borderWidth: 2,
    borderColor: '#9B9B9B',
    borderRadius: 100,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: Styles.colors.white,
  },
  icon: {
    fontSize: 15,
    color: Styles.colors.white,
  },
  key: {
    color: Styles.colors.text,
  },
  button: {
    width: 140,
    height: 50,
    borderRadius: 23,
    backgroundColor: Styles.colors.blue,
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
