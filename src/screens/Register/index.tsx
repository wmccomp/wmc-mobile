import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AxiosResponse } from 'axios';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

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
    setLoading(true);

    if (validateEmail(email) === false) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Digite um email válido!',
        visibilityTime: 3000,
      });
      return;
    }

    if (password.length <= 5) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Digite um password com mais de 6 caracteres!',
        visibilityTime: 3000,
      });
      return;
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
          Toast.show({
            type: 'success',
            text1: 'Sucesso',
            text2: 'Usuário criado com sucesso!',
            visibilityTime: 3000,
          });
          setUsername('');
          setEmail('');
          setPassword('');
        }

        navigate('Login');
      })
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: err.response.data.message,
          visibilityTime: 3000,
        });
        return;
      })
      .finally(() => setLoading(false));
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
                editable={!loading}
                placeholder="Nome"
                defaultValue=""
                value={username}
                onChangeText={(value) => setUsername(value)}
              />
              <Input
                editable={!loading}
                placeholder="Email"
                keyboardType="email-address"
                defaultValue=""
                value={email}
                onChangeText={(value) => setEmail(value)}
              />
              <Input
                editable={!loading}
                secureTextEntry={true}
                placeholder="Senha"
                defaultValue=""
                value={password}
                onChangeText={(value) => setPassword(value)}
              />
            </Fields>

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
