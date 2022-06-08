import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppRoutes from './app.routes';
import { Palette } from '../screens/Palette';

interface IPalette {
  colors: any[];
  ownerId: string;
  name: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  membersId: string[];
  authorizeChange: string[];
  _id: string;
}
export type AppStackParamList = {
  AppRoutes: undefined;
  Palette: { palette: IPalette };
};

const { Navigator, Screen } = createStackNavigator<AppStackParamList>();

const AppStack: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Screen name="AppRoutes" component={AppRoutes} />

    <Screen name="Palette" component={Palette} />
  </Navigator>
);

export default AppStack;
