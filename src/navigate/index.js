import React, { Fragment } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import ConstData from '../common/ConstData';
import { ROUTES } from '../common/Routes';
import AdminDashboardScreen from '../screens/admin-dashboard';
import AddPropertyForm from '../screens/add-property';
import PropertyDetail from '../screens/property-details';
import AddCustomerScreen from '../screens/add-customer';

const Navigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Fragment>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LOGIN' screenOptions={ConstData.SCREEN_OPTIONS}>
          <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
          <Stack.Screen name={ROUTES.ADMIN_DASHBOARD} component={AdminDashboardScreen} />
          <Stack.Screen name={ROUTES.ADD_PROPERTY_FORM} component={AddPropertyForm} />
          <Stack.Screen name={ROUTES.PROPERTY_DETAILS} component={PropertyDetail} />
          <Stack.Screen name={ROUTES.ADD_CUSTOMER_FORM} component={AddCustomerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  )
}

export default Navigator;