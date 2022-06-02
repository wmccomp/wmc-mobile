import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/auth.routes';
import { useNavigation } from '@react-navigation/native';

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
import { PreviewUserProfile } from '../PreviewUserProfile/inde';
import { AppRoutesTabParamList } from '../../routes/app.routes';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

interface HeaderProps {
  type: 'logo' | 'back';
  title: string;
  option: boolean;
}

type AuthScreenProps = StackNavigationProp<RootStackParamList>;
type BottomTabScreenProps = BottomTabNavigationProp<AppRoutesTabParamList>;

export function Header({ type, title, option }: HeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const navigateAuth = useNavigation<AuthScreenProps>();
  const navigateApp = useNavigation<BottomTabScreenProps>();

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

    if (title === 'Paleta') {
      navigateApp.navigate('MyPalettes');
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
