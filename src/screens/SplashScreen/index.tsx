import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Container, Animation } from './styles';

import LoadAnimation from '../../../assets/splash.json';

export function SplashScreen() {
  const navigation = useNavigation();
  const size = Dimensions.get('window').width * 0.5;

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
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
