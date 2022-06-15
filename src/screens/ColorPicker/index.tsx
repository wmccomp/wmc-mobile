import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';
import { Text } from 'react-native';

import { Header } from '../../components/Header';
import { Button, ButtonLabel, Container, Icon } from './styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../routes/app-stack.routes';
import { IImagePickerResult } from '../../@types';

export function ColorPicker() {
  const { navigate }: NavigationProp<AppStackParamList, 'ExtractColor'> =
    useNavigation();

  async function pickImage() {
    let result: IImagePickerResult = (await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 1,
      },
    )) as IImagePickerResult;
    if (!result.cancelled) {
      navigate('ExtractColor', {
        imgSource: result.uri,
      });
    }
  }

  async function cameraImage() {
    let result: IImagePickerResult = (await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    })) as IImagePickerResult;

    if (!result.cancelled) {
      navigate('ExtractColor', {
        imgSource: result.uri,
      });
    }
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

  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <>
      <Header type="logo" title="Cor Inteligente" option={true} />
      <Container>
        <Button mode="select" onPress={pickImage}>
          <Icon name="upload" />
          <ButtonLabel>Selecionar Imagem</ButtonLabel>
        </Button>
        <Text>ou</Text>
        <Button mode="camera" onPress={cameraImage}>
          <Icon name="camera" />
          <ButtonLabel>Usar Câmera</ButtonLabel>
        </Button>
      </Container>
    </>
  );
}
