import { useContext, useState } from 'react';
import { Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Clipboard from 'expo-clipboard';

import { wmcApi } from '../../api';
import { LoginContext } from '../../context/auth';
import { Load } from '../Load';
import {
  Button,
  ButtonLabel,
  ButtonOption,
  CloseModalArea,
  Container,
  Title,
} from './styles';
import { PaletteContext } from '../../context/palette';
import { ForceUpdateContext } from '../../context/forceUpdate';

interface IColorOptionsProps {
  visible: boolean;
  onClose: () => void;
  paletteId: string;
  colorId: string;
  copyRGB: () => void;
}

export function ColorOptions({
  onClose,
  visible,
  paletteId,
  colorId,
  copyRGB,
}: IColorOptionsProps) {
  const [loading, setLoading] = useState(false);

  const { deleteColor, getUserPalettes } = useContext(PaletteContext);
  const { forceUpdate } = useContext(ForceUpdateContext);

  async function handleDeleteColor() {
    setLoading(true);

    try {
      await deleteColor(paletteId, colorId);
    } catch (error) {
      Alert.alert('Erro', error.response.data.message);
    } finally {
      setLoading(false);
      onClose();
      await getUserPalettes();
      forceUpdate();
    }
  }

  function handleCopyRGB() {
    copyRGB();
    onClose();
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <CloseModalArea onPress={onClose}>
        <TouchableWithoutFeedback>
          <Container>
            <Title>Opções</Title>
            <ButtonOption onPress={handleCopyRGB} color="shape">
              <ButtonLabel>Copiar RGB</ButtonLabel>
            </ButtonOption>
            <ButtonOption onPress={handleDeleteColor} color="attention">
              <ButtonLabel>Apagar</ButtonLabel>
            </ButtonOption>

            {loading && <Load />}
          </Container>
        </TouchableWithoutFeedback>
      </CloseModalArea>
    </Modal>
  );
}
