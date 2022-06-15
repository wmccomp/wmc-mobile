import CheckBox from 'expo-checkbox';
import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { wmcApi } from '../../api';
import { LoginContext } from '../../context/auth';
import { Load } from '../Load';
import { ModalCustom } from '../ModalCustom';
import {
  Button,
  ButtonLabel,
  CheckBoxContainer,
  CheckBoxLabel,
  Input,
  Title,
} from './styles';

interface IAddPaletteProps {
  visible: boolean;
  onClose: (createPaletteStatus?: number) => void;
}

const INITIAL_STATE = {
  isPublic: true,
  name: '',
};

export function AddPalette({ onClose, visible }: IAddPaletteProps) {
  const [isPublic, setIsPublic] = useState(true);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { token } = useContext(LoginContext);

  function resetState() {
    setIsPublic(INITIAL_STATE.isPublic);
    setName(INITIAL_STATE.name);
  }

  function handleClose(createPaletteStatus?: number) {
    onClose(createPaletteStatus);
    resetState();
  }

  async function handleCreatePalette() {
    setLoading(true);
    const data = { name, isPublic };
    try {
      const response = await wmcApi.post('palette/create', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      handleClose(response.status);
    } catch (error) {
      Alert.alert('Erro', error.response.data.message);
      setLoading(false);
      handleClose();
    }
  }

  return (
    <ModalCustom onClose={handleClose} visible={visible}>
      <Title>Adicionar Paleta</Title>
      <Input
        placeholder="Título da Paleta"
        onChangeText={setName}
        value={name}
      />
      <CheckBoxContainer onPress={() => setIsPublic((prev) => !prev)}>
        <CheckBoxLabel>Pública?</CheckBoxLabel>
        <CheckBox
          disabled={false}
          value={isPublic}
          onValueChange={setIsPublic}
          color={isPublic ? '#000000' : undefined}
        />
      </CheckBoxContainer>
      {loading ? (
        <Load />
      ) : (
        <Button onPress={handleCreatePalette}>
          <ButtonLabel>OK</ButtonLabel>
        </Button>
      )}
    </ModalCustom>
  );
}
