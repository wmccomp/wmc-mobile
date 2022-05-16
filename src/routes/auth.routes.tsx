import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Login } from '../screens/Login';

export type RootStackParamList = {
  Dashboard: undefined;
  Register: undefined;
  Login: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

const AuthRoutes: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Dashboard" component={Dashboard} />

    <Screen name="Register" component={Register} />

    <Screen name="Login" component={Login} />
  </Navigator>
);

export default AuthRoutes;
