import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Text } from 'react-native'
import { ROUTES } from '../../common/Routes';
import AdminHome from '../admin-home';
import AdminCustomers from '../admin-customers';
import AdminProperties from '../admin-properties';
import CustomBottomTabBar from '../../components/custom-bottom-tab';

const Tab = createBottomTabNavigator();

const AdminDashboardScreen = (props) => {
  return (
    <Tab.Navigator initialRouteName={ROUTES.ADMIN_HOME} tabBar={(props) => <CustomBottomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name={ROUTES.ADMIN_HOME} component={AdminHome} />
      <Tab.Screen name={ROUTES.ADMIN_CUSTOMERS} component={AdminCustomers} />
      <Tab.Screen name={ROUTES.ADMIN_PROPERTIES} component={AdminProperties} />
      <Tab.Screen name={ROUTES.ACCOUNT_INFO} component={AdminProperties} />
    </Tab.Navigator>
  )
}

export default AdminDashboardScreen;