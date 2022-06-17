import * as Clipboard from 'expo-clipboard';
import { useContext, useState } from 'react';
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
  }

  function closeModal() {
    setShowColorOptions(false);
  }

  function handleCopyRGB() {
    Toast.show({
      type: 'info',
      text1: 'Copiado RGB',
      text2: 'Cor copiada para área de transferência',
      visibilityTime: 2000,
    });
    copyToClipboard(color.values.rgb);
  }

  function handleColorLongPress() {
    setShowColorOptions(true);
  }

  async function handleColorPress() {
    Toast.show({
      type: 'info',
      text1: 'Copiado Hexadecimal',
      text2: 'Cor copiada para área de transferência',
      visibilityTime: 2000,
    });
    copyToClipboard(color.values.hex);

    try {
      await addRecentColor(color);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Erro ao adicionar cor às cores recentes.',
        visibilityTime: 2000,
      });
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
