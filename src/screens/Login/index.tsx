import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { LoginContext } from '../../context/auth';

import Logo from '../../assets/logo-large.svg';

import { Load } from '../../components/Load';
import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { InputError } from '../../components/Form/InputError';

import { Container, Title, Form, Fields } from './styles';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [defaultError, setDefaultError] = useState('');
  const [loading, setLoading] = useState(false);

  const { logIn } = useContext(LoginContext);

  async function handleLogin() {
    if (!email) {
      return Alert.alert('Digite seu email!');
    }

    if (!password) {
      return Alert.alert('Digite sua senha!');
    }

    setLoading(true);
    setInvalidEmail(false);
    setInvalidPassword(false);
    setDefaultError('');

    logIn({ email, password }).catch((error) => {
      setLoading(false);
      Alert.alert('Erro', error.response.data.message);
    });
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
              {/* {defaultError && <InputError title={defaultError} />} */}

              <Input
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={(value) => setEmail(value)}
              />
              {invalidEmail && <InputError title="Email inválido" />}

              <Input
                secureTextEntry={true}
                placeholder="Senha"
                value={password}
                onChangeText={(value) => setPassword(value)}
              />
              {invalidPassword && <InputError title="Senha inválida" />}
            </Fields>

            {loading ? (
              <Load />
            ) : (
              <Button title="ENTRAR" onPress={handleLogin} />
            )}
          </Form>
        </Container>
      </ScrollView>
    </>
  );
}
