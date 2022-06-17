import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { useContext } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { IPreviewUserProfileProps } from '../../@types';
import { LoginContext } from '../../context/auth';
import { SplashContext } from '../../context/splash';
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
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const { logOut, user } = useContext(LoginContext);
  const { setShowSplash } = useContext(SplashContext);

  function handleSettings() {
    onClose();
    navigate('Settings');
  }

  function handleLogout() {
    logOut();
    setShowSplash(true);
  }

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
              <Name>{user.username}</Name>
              <ProfilePicture source={{ uri: user.profilePicture }} />
              <ButtonConfig>
                <Config onPress={handleSettings}>Configurações</Config>
              </ButtonConfig>
              <LogOut onPress={handleLogout}>Sair</LogOut>
            </ModalContainer>
          </TouchableWithoutFeedback>
        </CloseModalArea>
      </Modal>
    </>
  );
}
