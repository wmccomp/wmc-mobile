import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppRoutes from './app.routes';
import { Palette } from '../screens/Palette';
import { IPalette } from '../@types';
import { ExtractColor } from '../screens/ExtractColor';

export type AppStackParamList = {
  AppRoutes: undefined;
  Palette: { palette: IPalette };
  ExtractColor: { imgSource: string };
};

const { Navigator, Screen } = createStackNavigator<AppStackParamList>();

const AppStack: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Screen name="AppRoutes" component={AppRoutes} />

    <Screen
      options={{
        detachPreviousScreen: true,
      }}
      name="Palette"
      component={Palette}
    />

    <Screen
      options={{
        detachPreviousScreen: false,
      }}
      name="ExtractColor"
      component={ExtractColor}
    />
  </Navigator>
);

export default AppStack;
