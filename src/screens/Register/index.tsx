import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AxiosResponse } from 'axios';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

import { wmcApi } from '../../api';
import { hashEmail } from '../../utils';

import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { Load } from '../../components/Load';

import Logo from '../../assets/logo-large.svg';

import { Container, Title, Form, Fields } from './styles';

export function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async function handleRegister() {
    if (validateEmail(email) === false) {
      return Alert.alert('Digite um email válido!');
    }

    if (password.length <= 5) {
      return Alert.alert('Digite um password com mais de 6 caracteres!');
    }

    wmcApi
      .post('user/create', {
        username,
        email,
        password,
        profilePicture: `https://www.gravatar.com/avatar/${hashEmail(
          email,
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

  function displaySuccess() {
    if (success) return Alert.alert('Usuário criado com sucesso!');
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

            {displaySuccess()}

            {loading ? (
              <Load />
            ) : (
              <Button title="CADASTRAR" onPress={handleRegister} />
            )}
          </Form>
        </Container>
      </ScrollView>
    </>
  );
}
