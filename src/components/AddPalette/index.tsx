import CheckBox from 'expo-checkbox';
import { useContext, useState } from 'react';
import {
  Alert,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { wmcApi } from '../../api';
import { LoginContext } from '../../context/auth';
import { Load } from '../Load';
import {
  Button,
  ButtonLabel,
  CheckBoxContainer,
  CheckBoxLabel,
  CloseModalArea,
  Container,
  Input,
  Title,
} from './styles';

interface IAddPaletteProps {
  visible: boolean;
  onClose: () => void;
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

  function handleClose() {
    onClose();
    resetState();
  }

  async function handleCreatePalette() {
    setLoading(true);
    const data = { name, isPublic };
    try {
      await wmcApi.post('palette/create', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      Alert.alert('Erro', error.response.data.message);
    } finally {
      setLoading(false);
      handleClose();
    }
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
          </Container>
        </TouchableWithoutFeedback>
      </CloseModalArea>
    </Modal>
  );
}
