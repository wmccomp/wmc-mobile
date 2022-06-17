import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { Header } from '../../components/Header';
import { Button } from '../../components/Form/Button';

import { Container, Photo, Form, Fields } from './styles';
import { Input } from '../../components/Form/Input';

export function Settings() {
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  async function handleRegister() {
    try {
      navigate('Listagem');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível salvar!',
        visibilityTime: 3000,
      });
    }
  }

  return (
    <>
      <Header type="back" title="Configurações" option={false} />
      <ScrollView>
        <Container>
          <Photo name="account-circle" />

          <Form>
            <Fields>
              <Input placeholder="Nome" keyboardType="default" />
              <Input placeholder="Email" keyboardType="email-address" />
              <Input placeholder="Senha" keyboardType="default" />
              <Input placeholder="Confirmar Senha" keyboardType="default" />
            </Fields>

            <Button title="PRONTO" onPress={handleRegister} />
          </Form>
        </Container>
      </ScrollView>
    </>
  );
}
