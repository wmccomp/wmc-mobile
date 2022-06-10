import CheckBox from 'expo-checkbox';
import { useContext, useEffect, useState } from 'react';
import { Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { wmcApi } from '../../api';
import { LoginContext } from '../../context/auth';
import { Load } from '../Load';
import {
  Button,
  ButtonLabel,
  CloseModalArea,
  Color,
  Container,
  Input,
  Title,
} from './styles';

interface IAddColorProps {
  visible: boolean;
  onClose: () => void;
  paletteId: string;
}

const INITIAL_STATE = {
  color: '#FFFFFF',
  colorCache: '#FFFFFF',
  title: '',
  loading: false,
};

export function AddColor({ onClose, visible, paletteId }: IAddColorProps) {
  const [color, setColor] = useState('#FFFFFF');
  const [colorCache, setColorCache] = useState('#FFFFFF');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const { token } = useContext(LoginContext);

  function generateValues() {
    const colorSplit = color.substring(1).match(/.{2}/g);

    const rgbArr = colorSplit
      ? colorSplit.map((char) => parseInt(char, 16))
      : [0, 0, 0];
    const rgb = rgbArr.reduce((acc, num) => `${acc}${num}, `, '');

    return {
      hex: color,
      rgb: `(${rgb.substring(0, rgb.length - 2)})`,
    };
  }

  function handleClose() {
    onClose();
    resetState();
  }

  async function handleCreateColor() {
    setLoading(true);
    const data = {
      title,
      values: generateValues(),
    };
    try {
      await wmcApi.post(`color/create/${paletteId}`, data, {
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

  function filterCharacters(text: string) {
    const pattern = /^[#]*[a-fA-F0-9]*$/;

    if (pattern.test(text)) {
      setColor(text);
    }
  }

  function resetState() {
    setColor(INITIAL_STATE.color);
    setColorCache(INITIAL_STATE.colorCache);
    setTitle(INITIAL_STATE.title);
    setLoading(INITIAL_STATE.loading);
  }

  useEffect(() => {
    if (color.length === 7) setColorCache(color);
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}>
      <CloseModalArea onPress={handleClose}>
        <TouchableWithoutFeedback>
          <Container>
            <Title>Nova Cor</Title>
            <Input
              editable={!loading}
              placeholder="Título da Cor"
              onChangeText={setTitle}
              value={title}
            />
            <Input
              editable={!loading}
              maxLength={7}
              placeholder="Valor da Cor"
              onChangeText={filterCharacters}
              value={color}
            />

            <Color color={colorCache} />

            {loading ? (
              <Load />
            ) : (
              <Button onPress={handleCreateColor}>
                <ButtonLabel>OK</ButtonLabel>
              </Button>
            )}
          </Container>
        </TouchableWithoutFeedback>
      </CloseModalArea>
    </Modal>
  );
}
