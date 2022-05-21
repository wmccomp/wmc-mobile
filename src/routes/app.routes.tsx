import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SplashScreen } from '../screens/SplashScreen';
import { Home } from '../screens/Home';
import { Settings } from '../screens/Settings';
import { SearchPalette } from '../screens/SearchPalette';
import { MyPalettes } from '../screens/MyPalettes';

const { Navigator, Screen } = createBottomTabNavigator();

const AppRoutes = () => {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.white,
        tabBarInactiveTintColor: theme.colors.shape,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          backgroundColor: theme.colors.black,
        },
      }}
    >
      <Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          // Remover BottomTabNavigator da tela SplashScreen
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="Settings"
        component={Settings}
        options={{
          // Remover BottomTabNavigator da tela SplashScreen
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="SearchPalette"
        component={SearchPalette}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="MyPalettes"
        component={MyPalettes}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="palette" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="Lib"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="border-color" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};

export default AppRoutes;
