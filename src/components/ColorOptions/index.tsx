import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import { Load } from '../Load';
import { ButtonLabel, ButtonOption, Title } from './styles';
import { PaletteContext } from '../../context/palette';
import { ForceUpdateContext } from '../../context/forceUpdate';
import { ModalCustom } from '../ModalCustom';
import { IColorOptionsProps } from '../../@types';

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
      Toast.show({
        type: 'info',
        text1: 'Cor removida',
        text2: 'Cor removida com sucesso.',
        visibilityTime: 2000,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error.response.data.message,
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
      await getUserPalettes();
      forceUpdate();
      onClose();
    }
  }

  function handleCopyRGB() {
    copyRGB();
    onClose();
  }

  return (
    <ModalCustom onClose={onClose} visible={visible}>
      <Title>Opções</Title>
      <ButtonOption onPress={handleCopyRGB} color="shape">
        <ButtonLabel>Copiar RGB</ButtonLabel>
      </ButtonOption>
      <ButtonOption onPress={handleDeleteColor} color="attention">
        <ButtonLabel>Apagar</ButtonLabel>
      </ButtonOption>

      {loading && <Load />}
    </ModalCustom>
  );
}
