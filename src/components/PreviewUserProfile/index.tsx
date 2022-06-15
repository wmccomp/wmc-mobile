import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { IPreviewUserProfileProps } from '../../@types';
import { wmcApi } from '../../api';
import { LoginContext } from '../../context/auth';
import { Load } from '../Load';
import {
  ButtonConfig,
  CloseModalArea,
  Config,
  LogOut,
  ModalContainer,
  Name,
  ProfilePicture,
} from './styles';

export function PreviewUserProfile({
  onClose,
  visible,
}: IPreviewUserProfileProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const { logOut, token } = useContext(LoginContext);

  function handleSettings() {
    onClose();
    navigate('Settings');
  }

  function handleLogout() {
    logOut();
  }

  useEffect(() => {
    setLoading(true);
    wmcApi
      .get('user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data: { user } }) => {
        setName(user.username);
        setPicture(user.profilePicture);
      })
      .catch((err) => {
        Alert.alert('Erro', err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <CloseModalArea onPress={onClose}>
          <TouchableWithoutFeedback>
            <ModalContainer>
              {loading ? (
                <Load />
              ) : (
                <>
                  <Name>{name}</Name>
                  <ProfilePicture source={{ uri: picture }} />
                  <ButtonConfig>
                    <Config onPress={handleSettings}>Configurações</Config>
                  </ButtonConfig>
                  <LogOut onPress={handleLogout}>Sair</LogOut>
                </>
              )}
            </ModalContainer>
          </TouchableWithoutFeedback>
        </CloseModalArea>
      </Modal>
    </>
  );
}
