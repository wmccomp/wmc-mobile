import React, { useContext, useState } from 'react';
import { Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/auth.routes';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import {
  Container,
  HeaderContent,
  Title,
  OptionButton,
  NoOptionButton,
  Icon,
  BackButton,
  ModalContainer,
  Name,
  Photo,
  ButtonConfig,
  Config,
  LogOut,
} from './styles';

import Logo from '../../assets/logo.svg';
import { LoginContext } from '../../context/auth';

interface HeaderProps {
  type: 'logo' | 'back';
  title: string;
  option: boolean;
}

type AuthScreenProps = StackNavigationProp<RootStackParamList, 'Dashboard'>;

export function Header({ type, title, option }: HeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const navigateAuth = useNavigation<AuthScreenProps>();
  const { logOut } = useContext(LoginContext);

  function handleOpenModal() {
    if (modalOpen === true) {
      setModalOpen(false);
    }
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  function handleSettings() {
    handleCloseModal();

    navigate('Settings');
  }

  function handleLogout() {
    logOut();
  }

  function handleGoBack() {
    if (title === 'Login' || title === 'Cadastro') {
      navigateAuth.goBack();
    }

    if (title === 'Configurações') {
      navigateAuth.navigate('Home');
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={handleCloseModal}>
        <ModalContainer>
          <Name>Rafael Tavares</Name>

          <Photo name="account-circle" />
          <ButtonConfig>
            <Config onPress={handleSettings}>Configuracoes</Config>
          </ButtonConfig>
          <LogOut onPress={handleLogout}>Sair</LogOut>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
