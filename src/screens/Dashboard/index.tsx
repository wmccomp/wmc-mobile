import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/auth.routes';

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

type RegisterScreenProps = StackNavigationProp<RootStackParamList, 'Register'>;

export function Dashboard() {
  const navigation = useNavigation<RegisterScreenProps>();

  function handleRegister() {
    navigation.navigate('Register');
  }

  function handleLogin() {
    navigation.navigate('Login');
  }

  return (
    <Container>
      <Content>
        <Logo width={80} height={80} />
        <Title>Wheres My Color!</Title>
        <Descript>
          A melhor maneira de guardar as suas {'\n'}
          paletas de cores de forma rápida e priátca
        </Descript>
      </Content>

      <ButtonWrapper>
        <Button title="REGISTRE-SE" onPress={handleRegister} />
        <LoginContainer>
          <LoginText>Já tem uma conta?</LoginText>
          <Pressable onPress={handleLogin}>
            <ButtonLogin>Faça login</ButtonLogin>
          </Pressable>
        </LoginContainer>
      </ButtonWrapper>
    </Container>
  );
}
