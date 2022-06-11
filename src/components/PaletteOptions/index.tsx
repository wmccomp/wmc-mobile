import { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Load } from '../Load';
import {
  Button,
  ButtonGroup,
  ButtonLabel,
  ButtonOption,
  Title,
} from './styles';
import { PaletteContext } from '../../context/palette';
import { ForceUpdateContext } from '../../context/forceUpdate';
import { ModalCustom } from '../ModalCustom';
import { InputEdit } from '../InputEdit';

interface IPaletteOptionsProps {
  visible: boolean;
  onClose: () => void;
  paletteId: string;
}

export function PaletteOptions({
  onClose,
  visible,
  paletteId,
}: IPaletteOptionsProps) {
  const [loading, setLoading] = useState(false);
  const [paletteName, setPaletteName] = useState('');

  const { getUserPalette, deletePalette, updatePalette } =
    useContext(PaletteContext);

  async function handleDeletePalette() {
    setLoading(true);

    try {
      await deletePalette(paletteId);
    } catch (error) {
      Alert.alert('Erro', error.response.data.message);
    } finally {
      setLoading(false);
      onClose();
    }
  }

  async function handleUpdatePalette() {
    setLoading(true);

    try {
      await updatePalette(paletteId, { name: paletteName });
    } catch (error) {
      Alert.alert('Erro', error.response.data.message);
    } finally {
      setLoading(false);
      onClose();
    }
  }

  useEffect(() => {
    getUserPalette(paletteId).then(({ name }) => setPaletteName(name));
  }, []);

  return (
    <ModalCustom onClose={onClose} visible={visible}>
      {loading ? (
        <Load />
      ) : (
        <>
          <Title>Opções</Title>
          <InputEdit value={paletteName} onChangeText={setPaletteName} />
          <ButtonGroup>
            <ButtonOption onPress={handleDeletePalette} color="attention">
              <ButtonLabel>Apagar Paleta</ButtonLabel>
            </ButtonOption>
            <Button>
              <ButtonLabel onPress={handleUpdatePalette}>
                Confirmar Alteração
              </ButtonLabel>
            </Button>
          </ButtonGroup>
        </>
      )}
    </ModalCustom>
  );
}
