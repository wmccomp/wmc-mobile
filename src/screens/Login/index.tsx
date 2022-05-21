import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { LoginContext } from '../../context/auth';

import Logo from '../../assets/logo-large.svg';

import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';

import { Container, Title, Form, Fields } from './styles';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { logIn } = useContext(LoginContext);

  async function handleLogin() {
    try {
      logIn({
        email: email,
        password: password,
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar!');
    }
  }

  return (
    <>
      <Header type="back" title="Login" option={false} />
      <ScrollView>
        <Container>
          <Logo />
          <Title>Login</Title>

          <Form>
            <Fields>
              <Input
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={(value) => setEmail(value)}
              />
              <Input
                secureTextEntry={true}
                placeholder="Senha"
                value={password}
                onChangeText={(value) => setPassword(value)}
              />
            </Fields>

            <Button title="ENTRAR" onPress={handleLogin} />
          </Form>
        </Container>
      </ScrollView>
    </>
  );
}
