import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Button, Text} from 'native-base';

import {storeMonthlyAmount} from '../../redux/healthcare';
import RadioButton from '../../scaffolding/components/RadioButton';

import Header from '../shared/Header';
import SubHeader from '../shared/SubHeader';

import {Styles} from '../globalStyles';
import {signalHealthcarePresence} from '../../scaffolding/helpers/visitorSession';

class MonthlyAmount extends Component {
  state = {
    value: this.props.monthlyAmount,
  };

  componentDidMount() {
    signalHealthcarePresence(this.constructor.name);
  }

  onPress(value) {
    this.setState({value});
  }

  onSave() {
    // store value to AsyncStorage
    this.props.dispatch(
      storeMonthlyAmount(this.state.value, () => this.props.navigation.pop()),
    );
  }

  render() {
    const {navigation} = this.props;
    const {value} = this.state;
    return (
      <Container style={styles.component}>
        <Header showHomeButton={true} showSettingsButton={true}></Header>
        <SubHeader color="blue" text="View/Pay Bills" />

        <Content contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerSubview}>
              <Text style={styles.headerText}>Choose Amount</Text>
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <View style={styles.radioRow}>
              <RadioButton
                isSelected={value === 'total'}
                onPress={() => this.onPress('total')}
                outerColor={'#9B9B9B'}
                borderWidthMultiplier={0.2}
              />
              <Text style={styles.radioText}>Total new balance</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton
                isSelected={value === 'minimum'}
                onPress={() => this.onPress('minimum')}
                outerColor={'#9B9B9B'}
                borderWidthMultiplier={0.2}
              />
              <Text style={styles.radioText}>Minimum payment due</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton
                isSelected={value === 'fixed'}
                onPress={() => this.onPress('fixed')}
                outerColor={'#9B9B9B'}
                borderWidthMultiplier={0.2}
              />
              <Text style={styles.radioText}>Fixed amount</Text>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 50,
              }}>
              <Button
                elevation={0}
                onPress={this.onSave.bind(this)}
                style={styles.button}>
                <Text uppercase={false} style={styles.buttonText}>
                  Save
                </Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const {Healthcare} = state;

  return {
    monthlyAmount: Healthcare.monthlyAmount,
  };
}
export default connect(mapStateToProps)(MonthlyAmount);

const styles = StyleSheet.create({
  component: {
    backgroundColor: Styles.colors.white,
  },
  content: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 50,
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
  mainText: {
    fontSize: 20,
    marginBottom: 15,
  },
  subText: {
    fontSize: 14,
    color: Styles.colors.text,
  },
  radioRow: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Styles.colors.border,
  },
  radioText: {
    marginLeft: 20,
  },
  button: {
    width: 140,
    height: 50,
    borderRadius: 23,
    backgroundColor: Styles.colors.blue,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },
});
