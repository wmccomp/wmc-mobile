import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import uuid from 'react-native-uuid';

import { Header } from '../../components/Header';
import { InputForm } from '../../components/Form/InpuForm';
import { Button } from '../../components/Form/Button';

import Logo from '../../assets/logo-large.svg';

import { Container, Title, Form, Fields } from './styles';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatorio!'),
  email: Yup.string()
    .required('O email é obrigatorio!')
    .email('O email precisa ser válido.'),
  password: Yup.string()
    .required('O password é obrigatorio!')
    .min(4, 'A senha é muito curta, deve ter no mínimo 4 caracteres.'),
});

export function Register() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  async function handleRegister(form: Partial<FormData>) {
    const newUser = {
      id: String(uuid.v4()),
      name: form.name,
      email: form.email,
      password: form.password,
      date: new Date(),
    };

    try {
      navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar!');
    }
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
              <InputForm
                name="name"
                control={control}
                placeholder="Nome"
                keyboardType="default"
                error={errors.name && errors.name.message}
              />
              <InputForm
                name="email"
                control={control}
                placeholder="Email"
                keyboardType="email-address"
                error={errors.email && errors.email.message}
              />
              <InputForm
                name="password"
                control={control}
                placeholder="Senha"
                keyboardType="default"
                error={errors.password && errors.password.message}
              />
            </Fields>

            <Button title="CADASTRAR" onPress={handleSubmit(handleRegister)} />
          </Form>
        </Container>
      </ScrollView>
    </>
  );
}
