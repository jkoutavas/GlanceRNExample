import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from '../scaffolding/navigation/RootStack';

export type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;

export const Home: React.FC<HomeProps> = () => {
  return <Text style={styles.title}>Hello, world.</Text>;
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 16,
    marginTop: 32,
    fontSize: 24,
    fontWeight: '600',
  },
});
