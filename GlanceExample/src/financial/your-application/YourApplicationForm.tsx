import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'native-base';
import RadioButton from '../../scaffolding/components/RadioButton';
import Masking from '../../scaffolding/components/Masking';
import {placeholderTextColor} from '../../scaffolding/styles/form';

export default class YourApplicationForm extends Masking {
  state = {};
  render() {
    return (
      <View style={styles.component}>
        <View style={styles.section}>
          <Text style={styles.title}>
            Is your primary residence in the United States?*
          </Text>

          <View style={styles.option}>
            <RadioButton
              isSelected={this.state.us_resident === 'yes'}
              onPress={() => this.setState({us_resident: 'yes'})}
              borderWidthMultiplier={0.2}
            />
            <Text style={styles.optionText}>Yes</Text>
          </View>

          <View style={styles.option}>
            <RadioButton
              isSelected={this.state.us_resident === 'no'}
              onPress={() => this.setState({us_resident: 'no'})}
              borderWidthMultiplier={0.2}
            />
            <Text style={styles.optionText}>No</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Country of citizenship*</Text>

          <View style={styles.option}>
            <RadioButton
              isSelected={this.state.citizenship === 'us'}
              onPress={() => this.setState({citizenship: 'us'})}
              borderWidthMultiplier={0.2}
            />
            <Text style={styles.optionText}>United States</Text>
          </View>

          <View style={styles.option}>
            <RadioButton
              isSelected={this.state.citizenship === 'other'}
              onPress={() => this.setState({citizenship: 'other'})}
              borderWidthMultiplier={0.2}
            />
            <Text style={styles.optionText}>Another Country</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Permanent address</Text>

          <Text style={styles.paragraph}>
            Please enter your name exactly as it appears on your Social Security
            card.*
          </Text>

          <Input
            placeholder="First Name (Legal name)*"
            placeholderTextColor={placeholderTextColor}
            style={styles.input}
          />

          <Input
            placeholder="Middle Initial"
            placeholderTextColor={placeholderTextColor}
            style={styles.input}
          />

          <Input
            placeholder="Last Name*"
            placeholderTextColor={placeholderTextColor}
            style={styles.input}
          />

          <Input
            placeholder="City*"
            placeholderTextColor={placeholderTextColor}
            style={styles.input}
          />

          <Input
            placeholder="State*"
            placeholderTextColor={placeholderTextColor}
            style={styles.input}
          />

          <Input
            placeholder="Zip Code*"
            placeholderTextColor={placeholderTextColor}
            style={styles.input}
          />
        </View>

        <View style={styles.section}>
          <Input
            nativeID="masked"
            placeholder="Social Security Number (SSN)*"
            placeholderTextColor={placeholderTextColor}
            style={styles.input}
          />

          <Input
            placeholder="Date of Birth*"
            placeholderTextColor={placeholderTextColor}
            style={styles.input}
          />

          <Input
            placeholder="Daytime Phone*"
            placeholderTextColor={placeholderTextColor}
            style={styles.input}
          />

          <Input
            placeholder="Evening Phone"
            placeholderTextColor={placeholderTextColor}
            style={styles.input}
          />
        </View>

        <View style={styles.submit}>
          <Button block style={[styles.button, styles.primary]}>
            <Text>Continue</Text>
          </Button>

          <Button
            block
            style={[styles.button, styles.secondary]}
            onPress={() => this.props.navigation.pop()}>
            <Text>Cancel</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    paddingHorizontal: 20,
  },
  section: {
    borderColor: '#C7C7CC',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  title: {
    color: '#4A4A4A',
    fontSize: 16,
    fontWeight: '600',
  },
  paragraph: {
    color: '#4A4A4A',
    fontSize: 15,
    marginBottom: 15,
    marginTop: 5,
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 8,
  },
  optionText: {
    color: '#494949',
    fontSize: 14,
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#D1D1D6',
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '500',
    height: 45,
    marginVertical: 5,
    paddingLeft: 10,
  },
  submit: {
    marginTop: 25,
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
    width: 288,
  },
  primary: {
    backgroundColor: '#2C76C4',
  },
  secondary: {
    backgroundColor: '#B2B2BA',
  },
});
