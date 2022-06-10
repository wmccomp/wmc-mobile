import React from 'react';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import theme from './src/global/styles/theme';

import Routes from './src/routes';
import { LoginProvider } from './src/context/auth';
import { SplashProvider } from './src/context/splash';
import { PaletteProvider } from './src/context/palette';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <LoginProvider>
      <ThemeProvider theme={theme}>
        <SplashProvider>
          <PaletteProvider>
            <StatusBar
              barStyle="light-content"
              backgroundColor={theme.colors.black}
            />
            <Routes />
            <Toast />
          </PaletteProvider>
        </SplashProvider>
      </ThemeProvider>
    </LoginProvider>
  );
}
