import React, { useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';

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

export function Header({ type, title }: HeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);

  console.log(modalOpen);

  function handleOpenModal() {
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
          <BackButton onPress={handleCloseModal}>
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
