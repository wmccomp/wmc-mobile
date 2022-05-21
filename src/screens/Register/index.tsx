import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { wmcApi } from '../../api';
import { AxiosResponse } from 'axios';
import md5 from 'md5';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';

import Logo from '../../assets/logo-large.svg';

import { Container, Title, Form, Fields } from './styles';

const hashEmail = (email: string) => md5(email);

export function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  async function handleRegister() {
    wmcApi
      .post('user/create', {
        username,
        email,
        password,
        profilePicture: `https://www.gravatar.com/avatar/${hashEmail(
          email
        )}.png?s=100&d=identicon`,
      })
      .then(({ status }: AxiosResponse) => {
        if (status === 201) {
          setUsername('');
          setEmail('');
          setPassword('');
        }

        navigate('Login');
      })
      .catch((err) => {
        console.timeLog(err.response.message);
      });
  }

  return (
    <>
      <Header type="back" title="Cadastro" option={false} />
      <ScrollView>
        <Container>
          <Logo />
          <Title>Cadastro</Title>

          <Form>
            <Fields>
              <Input
                placeholder="Nome"
                defaultValue=""
                value={username}
                onChangeText={(value) => setUsername(value)}
              />
              <Input
                placeholder="Email"
                keyboardType="email-address"
                defaultValue=""
                value={email}
                onChangeText={(value) => setEmail(value)}
              />
              <Input
                secureTextEntry={true}
                placeholder="Senha"
                defaultValue=""
                value={password}
                onChangeText={(value) => setPassword(value)}
              />
            </Fields>

            <Button title="CADASTRAR" onPress={handleRegister} />
          </Form>
        </Container>
      </ScrollView>
    </>
  );
}
