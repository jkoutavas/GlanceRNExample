import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../../home/Home';

export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => (
  <Stack.Navigator screenOptions={{presentation: 'modal', headerShown: false}}>
    <Stack.Screen name="Home">{props => <Home {...props} />}</Stack.Screen>
  </Stack.Navigator>
);

const RootStackContainer: React.FC = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);

export default RootStackContainer;
