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

export function Register() {
  return (
    <>
      <Header type="back" title="Cadastro" />
      <Container>
        <Title>Register</Title>
      </Container>
    </>
  );
}
