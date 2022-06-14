import { useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  Image,
  Text,
  View,
  Alert,
} from 'react-native';
import ImageColors from 'react-native-image-colors';
import { ImageColorsResult } from 'react-native-image-colors/lib/typescript/types';
import { IColorExtractProps } from '../../@types';
import { createColor } from '../../uitls';
import { ColorCard } from '../ColorCard';

export function ColorExtract({
  visible,
  onClose,
  imgSource,
}: IColorExtractProps) {
  const [imageColorsResult, setImageColorsResult] = useState<ImageColorsResult>(
    {} as ImageColorsResult,
  );

  async function getImageColors(imageURI: string) {
    try {
      const result = await ImageColors.getColors(imageURI);

      setImageColorsResult(result);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'erro ao capturar as cores da imagem.');
    }
  }

  function closeModal() {
    onClose();
    setImageColorsResult({} as ImageColorsResult);
  }

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      onRequestClose={closeModal}>
      <Image source={{ uri: imgSource }} style={{ width: 130, height: 200 }} />
      <TouchableOpacity onPress={() => getImageColors(imgSource)}>
        <Text>Extrair Cores</Text>
      </TouchableOpacity>
      <View>
        {Object.keys(imageColorsResult)
          .filter((key) => key !== 'platform')
          .map((key, index) => (
            <ColorCard
              color={createColor(imageColorsResult[key], key)}
              key={index}
              showTitle
              title={key}
            />
          ))}
      </View>
    </Modal>
  );
}
