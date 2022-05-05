import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SplashScreen } from '../screens/SplashScreen';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Login } from '../screens/Login';
import { Home } from '../screens/Home';

export type RootStackParamList = {
  SplashScreen: undefined;
  Dashboard: undefined;
  Register: undefined;
  Login: undefined;
  Home: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

const AuthRoutes: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="SplashScreen" component={SplashScreen} />

    <Screen name="Dashboard" component={Dashboard} />

    <Screen name="Register" component={Register} />

    <Screen name="Login" component={Login} />

    <Screen name="Home" component={Home} />
  </Navigator>
);

export default AuthRoutes;
