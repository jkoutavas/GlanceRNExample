import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import GlanceIcon from '../scaffolding/components/GlanceIcon';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

/* healthcare imports */
import {
  HealthcareLogin,
  HealthcareMain,
  CustomerService,
  MyMeds,
  MyDoctors,
  MyNews,
  MyHealth,
  Enrollment,
  EnrollmentComplete,
  MyClaims,
  FileClaim,
  ClaimForm,
  ClaimComplete,
  MyPlan,
  ChangePlan,
  EnrollmentChecklist,
  EnrollmentApplication,
  MyPlanEnrollmentComplete,
  Bills,
  AutoPay,
  HowToPay,
  MonthlyAmount,
  AutoPayDate,
} from '../index';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.welcome}>
        <Text style={{color: '#FFF'}}>Welcome</Text>
        <Text style={{color: '#FFF', fontSize: 19}}>{props.username}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function DrawerView() {
  return (
    <Drawer.Navigator
      initialRouteName="HealthcareDrawer"
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#FFF',
        inactiveTintColor: '#FFF',
        activeBackgroundColor: 'none',
        itemStyle: {
          height: 60,
          borderTopWidth: 1,
          borderTopColor: '#30A9E0',
        },
      }}
      drawerPosition="right"
      drawerStyle={{
        width: 287,
        backgroundColor: '#014E79',
      }}>
      {/* TODO: check if there's any specific reason to duplicate this screen here */}
      {/* <Drawer.Screen name="HealthcareLogin" component={HealthcareLogin} options={{
          drawerLabel: 'Sign Out',
          drawerIcon: ({ focused, color, size }) => (
            <GlanceIcon name='icon-signout' style={styles.icon} />
          )
        }} /> */}

      <Drawer.Screen
        name="HealthcareMain"
        component={HealthcareMain}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({focused, color, size}) => (
            <GlanceIcon name="icon-home-outline" style={styles.icon} />
          ),
        }}
      />

      <Drawer.Screen
        name="CustomerService"
        component={CustomerService}
        options={{
          drawerLabel: 'Contact Customer Service',
          drawerIcon: ({focused, color, size}) => (
            <GlanceIcon name="icon-customer-support" style={styles.icon} />
          ),
        }}
      />

      <Drawer.Screen
        name="MyMeds"
        component={MyMeds}
        options={{
          drawerLabel: 'My Medications',
          drawerIcon: ({focused, color, size}) => (
            <GlanceIcon name="icon-meds" style={styles.icon} />
          ),
        }}
      />

      <Drawer.Screen
        name="MyDoctors"
        component={MyDoctors}
        options={{
          drawerLabel: 'My Doctors',
          drawerIcon: ({focused, color, size}) => (
            <GlanceIcon name="icon-mydoctors" style={styles.icon} />
          ),
        }}
      />

      <Drawer.Screen
        name="MyNews"
        component={MyNews}
        options={{
          drawerLabel: 'Global News',
          drawerIcon: ({focused, color, size}) => (
            <GlanceIcon name="icon-news" style={styles.icon} />
          ),
        }}
      />

      <Drawer.Screen
        name="MyHealth"
        component={MyHealth}
        options={{
          drawerLabel: 'My Health',
          drawerIcon: ({focused, color, size}) => (
            <GlanceIcon name="icon-yourhealth" style={styles.icon} />
          ),
        }}
      />

      <Drawer.Screen name="Enrollment" component={Enrollment} />

      <Drawer.Screen name="EnrollmentComplete" component={EnrollmentComplete} />

      <Drawer.Screen
        name="MyClaims"
        component={MyClaims}
        options={{
          drawerLabel: 'My Claims',
          drawerIcon: ({focused, color, size}) => (
            <GlanceIcon name="icon-myclaim" style={styles.icon} />
          ),
        }}
      />

      <Drawer.Screen name="FileClaim" component={FileClaim} />

      <Drawer.Screen name="ClaimForm" component={ClaimForm} />

      <Drawer.Screen name="ClaimComplete" component={ClaimComplete} />

      <Drawer.Screen
        name="MyPlan"
        component={MyPlan}
        options={{
          drawerLabel: 'My Plan',
          drawerIcon: ({focused, color, size}) => (
            <GlanceIcon
              name="icon-myplan"
              style={[styles.icon, {fontSize: 16}]}
            />
          ),
        }}
      />

      <Drawer.Screen name="ChangePlan" component={ChangePlan} />

      <Drawer.Screen
        name="EnrollmentChecklist"
        component={EnrollmentChecklist}
      />

      <Drawer.Screen
        name="EnrollmentApplication"
        component={EnrollmentApplication}
      />

      <Drawer.Screen
        name="MyPlanEnrollmentComplete"
        component={MyPlanEnrollmentComplete}
      />

      <Drawer.Screen
        name="Bills"
        component={Bills}
        options={{
          drawerLabel: 'View/Pay Bills',
          drawerIcon: ({focused, color, size}) => (
            <GlanceIcon
              name="icon-credit-card"
              style={[styles.icon, {fontSize: 16}]}
            />
          ),
        }}
      />

      <Drawer.Screen name="AutoPay" component={AutoPay} />

      <Drawer.Screen name="HowToPay" component={HowToPay} />

      <Drawer.Screen name="MonthlyAmount" component={MonthlyAmount} />

      <Drawer.Screen name="AutoPayDate" component={AutoPayDate} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  welcome: {
    flexDirection: 'row',
    paddingBottom: 15,
    marginHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
  },
  icon: {
    color: '#FFF',
    fontSize: 22,
    paddingRight: 0,
  },
});

export default DrawerView;
