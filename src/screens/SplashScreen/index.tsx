import React, { useContext, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { Container, Animation } from './styles';

import LoadAnimation from '../../../assets/splash.json';
import { SplashContext } from '../../context/splash';

export function SplashScreen() {
  const navigation = useNavigation();
  const size = Dimensions.get('window').width * 0.5;

  const { setShowSplash } = useContext(SplashContext);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        }),
      );
    }, 4000);
  }, []);

  return (
    <Container>
      <Animation
        source={LoadAnimation}
        style={{ width: size, height: size }}
        autoPlay
        loop
        resizeMode="contain"
      />
    </Container>
  );
}
