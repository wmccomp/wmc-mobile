import React, { useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/auth.routes';

import {
  Container,
  HeaderContent,
  Title,
  OptionButton,
  Icon,
  BackButton,
  ModalContainer,
  Name,
  Photo,
  Config,
  LogOut,
} from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  type: 'logo' | 'back';
  title: string;
}

type RegisterScreenProps = StackNavigationProp<RootStackParamList, 'Dashboard'>;

export function Header({ type, title }: HeaderProps) {
  const navigation = useNavigation<RegisterScreenProps>();
  const [modalOpen, setModalOpen] = useState(false);

  console.log(modalOpen);

  function handleLastScreen() {
    if (title === 'Login' || title === 'Cadastro') {
      navigation.navigate('Dashboard');
    }
  }

  function handleOpenModal() {
    if (modalOpen === true) {
      setModalOpen(false);
    }
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  return (
    <Container>
      <HeaderContent>
        {type === 'logo' ? (
          <Logo />
        ) : (
          <BackButton onPress={handleLastScreen}>
            <Icon name="arrow-back" />
          </BackButton>
        )}

        <Title>{title}</Title>

        <OptionButton onPress={handleOpenModal}>
          <Icon name="more-vert" />
        </OptionButton>
      </HeaderContent>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={handleCloseModal}
      >
        <ModalContainer>
          <Name>Rafael Tavares</Name>

          <Photo name="account-circle" />

          <Config>Configuracoes</Config>
          <LogOut>Sair</LogOut>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
