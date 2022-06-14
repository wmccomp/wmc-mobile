import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { Header } from '../../components/Header';
import { ColorExtract } from '../../components/ColorExtract';
import { Button, ButtonLabel, Container } from './styles';

export interface IImagePickerResult {
  cancelled: boolean;
  height: number;
  type: string;
  uri: string;
  width: number;
}

export function ColorPicker() {
  const [image, setImage] = useState('');

  async function pickImage() {
    let result: IImagePickerResult = (await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      },
    )) as IImagePickerResult;

    console.log(result);
    setImage((prev) => (result.cancelled ? prev : result.uri));
  }

  async function cameraImage() {
    let result: IImagePickerResult = (await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    })) as IImagePickerResult;

    setImage((prev) => (result.cancelled ? prev : result.uri));
  }

  async function getPermissions() {
    const hasCameraPermission = await ImagePicker.getCameraPermissionsAsync();
    if (!hasCameraPermission) {
      await ImagePicker.requestCameraPermissionsAsync();
    }

    const hasLibraryPermissions =
      await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!hasLibraryPermissions) {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
  }

  function closeModal() {
    setImage('');
  }

  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <>
      <ColorExtract imgSource={image} onClose={closeModal} visible={!!image} />
      <Header type="logo" title="Where's My Color?" option={true} />
      <Container>
        <Button mode="select" onPress={pickImage}>
          <ButtonLabel>Selecionar Imagem</ButtonLabel>
        </Button>
        <Text>ou</Text>
        <Button mode="camera" onPress={cameraImage}>
          <ButtonLabel>Usar Câmera</ButtonLabel>
        </Button>
      </Container>
    </>
  );
}
