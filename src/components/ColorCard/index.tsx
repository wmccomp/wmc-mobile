import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

import { Color } from './styles';

interface IColorCardProps {
  color: string;
}

export function ColorCard({ color }: IColorCardProps) {
  function copyToClipboard() {
    Clipboard.setString(color);
    Toast.show({
      type: 'success',
      text1: 'Sucesso!',
      text2: 'Cor copiada para área de transferência',
      visibilityTime: 2000,
    });
  }
  return <Color onPress={() => copyToClipboard()} color={color} />;
}
