import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import { Alert, Modal } from 'react-native';
import Toast from 'react-native-toast-message';
import { IColor } from '../../@types';
import { ColorOptions } from '../ColorOptions';

import { CardWrapper, Color, ColorTitle } from './styles';

interface IColorCardProps {
  color: IColor;
  paletteId: string;
  title?: string;
  showTitle?: boolean;
}

export function ColorCard({
  color,
  title,
  showTitle,
  paletteId,
}: IColorCardProps) {
  const [showColorOptions, setShowColorOptions] = useState(false);

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
  return (
    <CardWrapper>
      <ColorOptions
        copyRGB={() => copyToClipboard(color.values.rgb)}
        visible={showColorOptions}
        paletteId={paletteId}
        colorId={color._id}
        onClose={closeModal}
      />
      <Color
        onLongPress={() => setShowColorOptions(true)}
        onPress={() => copyToClipboard(color.values.hex)}
        color={color.values.hex}
      />
      {showTitle && <ColorTitle>{title}</ColorTitle>}
    </CardWrapper>
  );
}
