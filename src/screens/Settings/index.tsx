import React from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

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
      Alert.alert('Não foi possível salvar!');
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
