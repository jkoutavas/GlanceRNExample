import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../../home/Home';
import GlanceWebView from '../../home/GlanceWebView';
import GlanceMapsView from '../../home/GlanceMapsView';
import TwoWayVideoDialog from '../../home/TwoWayVideoDialog';
import Settings from '../../settings/Settings';
import Accounts from '../../financial/accounts/Accounts';
import Appointment from '../../financial/appointment/Appointment';
import Checking from '../../financial/checking/Checking';
import Footer from '../../financial/shared/components/Footer';
import Locations from '../../financial/locations/Locations';
import Login from '../../financial/login/Login';
import OpenAccount from '../../financial/open-account/OpenAccount';
import Savings from '../../financial/savings/Savings';
import Topics from '../../financial/topics/Topics';
import YourApplication from '../../financial/your-application/YourApplication';
import HealthcareDrawer from '../../healthcare/Drawer';
import HealthcareLogin from '../../healthcare/login/Login';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootStack = () => (
  <Stack.Navigator mode="modal" headerMode="none" initialRouteName="Main">
    <Stack.Screen name="Main">{props => <MainStack {...props} />}</Stack.Screen>
    <Stack.Screen name="TwoWayVideoDialog">
      {props => <TwoWayVideoDialog {...props} />}
    </Stack.Screen>
    <Stack.Screen name="GlanceWebView">
      {props => <GlanceWebView {...props} />}
    </Stack.Screen>
    <Stack.Screen name="GlanceMapsView">
      {props => <GlanceMapsView {...props} />}
    </Stack.Screen>
    <Stack.Screen name="Settings">
      {props => <Settings {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Home">
    <Stack.Screen name="Home">{props => <Home {...props} />}</Stack.Screen>
    <Stack.Screen name="FinancialLogin">
      {props => <FinancialStack {...props} />}
    </Stack.Screen>
    <Stack.Screen name="HealthcareLogin">
      {props => <HealthcareStack {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const FinancialStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Login">
    <Stack.Screen name="FinancialLogin">
      {props => <FinancialMainStack {...props} />}
    </Stack.Screen>
    <Stack.Screen name="OpenAccount">
      {props => <OpenAccount {...props} />}
    </Stack.Screen>
    <Stack.Screen name="YourApplication">
      {props => <YourApplication {...props} />}
    </Stack.Screen>
    <Stack.Screen name="Help">{props => <HelpStack {...props} />}</Stack.Screen>
  </Stack.Navigator>
);

const FinancialMainStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Login">
    <Stack.Screen name="Login">{props => <Login {...props} />}</Stack.Screen>

    <Stack.Screen name="MainAccounts">
      {props => (
        <Tab.Navigator
          tabBar={props => <Footer {...props} />}
          initialRouteName="MainAccounts"
          swipeEnabled={false}>
          <Tab.Screen name="MainAccounts" component={MainAccountsStack} />
        </Tab.Navigator>
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

const MainAccountsStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Accounts">
    <Stack.Screen name="Accounts">
      {props => <Accounts {...props} />}
    </Stack.Screen>
    <Stack.Screen name="Checking">
      {props => <Checking {...props} />}
    </Stack.Screen>
    <Stack.Screen name="Savings">
      {props => <Savings {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const HelpStack = () => (
  <Stack.Navigator Topics="none" initialRouteName="Topics">
    <Stack.Screen name="Topics">{props => <Topics {...props} />}</Stack.Screen>
    <Stack.Screen name="Appointment">
      {props => <Appointment {...props} />}
    </Stack.Screen>
    <Stack.Screen name="Locations">
      {props => <Locations {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const HealthcareStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName="HealthcareLogin">
    <Stack.Screen name="HealthcareLogin">
      {props => <HealthcareLogin {...props} />}
    </Stack.Screen>
    <Stack.Screen name="HealthcareDrawer">
      {props => <HealthcareDrawer {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const RootStackContainer = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);

export default RootStackContainer;
