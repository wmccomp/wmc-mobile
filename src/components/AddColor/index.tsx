import { useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import { IAddColorProps } from '../../@types';
import { wmcApi } from '../../api';
import { LoginContext } from '../../context/auth';
import { generateValues } from '../../utils';
import { Load } from '../Load';
import { ModalCustom } from '../ModalCustom';
import { Button, ButtonLabel, Color, Input, Title } from './styles';

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

  function handleClose() {
    onClose();
    resetState();
  }

  async function handleCreateColor() {
    setLoading(true);
    const data = {
      title,
      values: generateValues(color),
    };
    try {
      await wmcApi.post(`color/create/${paletteId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Cor criada com sucesso!',
        visibilityTime: 3000,
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
    <ModalCustom onClose={handleClose} visible={visible}>
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
    </ModalCustom>
  );
}
