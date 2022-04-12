import React from 'react';

import { RectButtonProps } from 'react-native-gesture-handler';

import { Header } from '../../components/Header';
import { Button } from '../../components/Form/Button';

import Logo from '../../assets/logo.svg';

import {
  Container,
  Content,
  Title,
  Descript,
  ButtonWrapper,
  LoginContainer,
  LoginText,
  Pressable,
  ButtonLogin,
} from './styles';

export function Login() {
  return (
    <>
      <Header type="back" title="Login" />
      <Container>
        <Title>Login</Title>
      </Container>
    </>
  );
}
