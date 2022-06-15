import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/auth.routes';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import {
  Container,
  HeaderContent,
  Title,
  OptionButton,
  NoOptionButton,
  Icon,
  BackButton,
} from './styles';

import Logo from '../../assets/logo.svg';
import { PreviewUserProfile } from '../PreviewUserProfile';
import { AppStackParamList } from '../../routes/app-stack.routes';
import { HeaderProps } from '../../@types';

export function Header({ type, title, option, paletteScreen }: HeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const navigateAuth: StackNavigationProp<RootStackParamList> = useNavigation();

  const navigateStack: NavigationProp<AppStackParamList> = useNavigation();

  function handleOpenModal() {
    if (modalOpen === true) {
      setModalOpen(false);
    }
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  function handleGoBack() {
    if (title === 'Login' || title === 'Cadastro') {
      navigateAuth.goBack();
    }

    if (title === 'Configurações') {
      navigateAuth.navigate('Home');
    }

    if (paletteScreen) {
      navigateStack.goBack();
    }

    if (title === 'Extrair Cor da Imagem') {
      navigateStack.goBack();
    }
  }

  return (
    <Container>
      <HeaderContent>
        {type === 'logo' ? (
          <Logo />
        ) : (
          <BackButton onPress={handleGoBack}>
            <Icon name="arrow-back" />
          </BackButton>
        )}

        <Title>{title}</Title>

        {option === true ? (
          <OptionButton onPress={handleOpenModal}>
            <Icon name="more-vert" />
          </OptionButton>
        ) : (
          <NoOptionButton>
            <Icon name="more-vert" />
          </NoOptionButton>
        )}
      </HeaderContent>
      {modalOpen && (
        <PreviewUserProfile onClose={handleCloseModal} visible={modalOpen} />
      )}
    </Container>
  );
}
