import * as Clipboard from 'expo-clipboard';
import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { IColorCardProps } from '../../@types';
import { PaletteContext } from '../../context/palette';
import { ColorOptions } from '../ColorOptions';

import { CardWrapper, Color, ColorTitle } from './styles';

export function ColorCard({
  color,
  title,
  showTitle,
  paletteId,
}: IColorCardProps) {
  const [showColorOptions, setShowColorOptions] = useState(false);

  const { addRecentColor } = useContext(PaletteContext);

  function copyToClipboard(colorVal: string) {
    Clipboard.setString(colorVal);
    Toast.show({
      type: 'success',
      text1: 'Sucesso!',
      text2: 'Cor copiada para área de transferência',
      visibilityTime: 2000,
    });
  }

  function closeModal() {
    setShowColorOptions(false);
  }

  function handleCopyRGB() {
    copyToClipboard(color.values.rgb);
  }

  function handleColorLongPress() {
    setShowColorOptions(true);
  }

  async function handleColorPress() {
    copyToClipboard(color.values.hex);

    try {
      await addRecentColor(color);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao adicionar cor às cores recentes.');
    }
  }

  return (
    <CardWrapper>
      {paletteId && (
        <ColorOptions
          copyRGB={handleCopyRGB}
          visible={showColorOptions}
          paletteId={paletteId}
          colorId={color._id}
          onClose={closeModal}
        />
      )}
      <Color
        onLongPress={handleColorLongPress}
        onPress={handleColorPress}
        color={color.values.hex}
      />
      {showTitle && <ColorTitle>{title}</ColorTitle>}
    </CardWrapper>
  );
}
