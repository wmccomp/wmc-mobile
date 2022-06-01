import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppRoutes from './app.routes';
import { Palette } from '../screens/Palette';

export type RootStackParamList = {
  MainHome: undefined;
  Palette: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

const AppStack: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Screen name="MainHome" component={AppRoutes} />

    <Screen name="Palette" component={Palette} />
  </Navigator>
);

export default AppStack;
