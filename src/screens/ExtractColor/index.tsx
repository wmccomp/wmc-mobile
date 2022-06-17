import { RouteProp, useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import ImageColors from 'react-native-image-colors';
import Toast from 'react-native-toast-message';

import { IColor } from '../../@types';
import { AddPalette } from '../../components/AddPalette';
import { ColorCard } from '../../components/ColorCard';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { PaletteContext } from '../../context/palette';
import { AppStackParamList } from '../../routes/app-stack.routes';
import { createColor } from '../../utils';
import {
  Button,
  ButtonGroup,
  ButtonLabel,
  ColorsContainer,
  ColorsContainerScroll,
  ExtractColorContainer,
  Image,
} from './styles';

export function ExtractColor() {
  const {
    params: { imgSource },
  } = useRoute<RouteProp<AppStackParamList, 'ExtractColor'>>();
  const { updatePalette, getUserPalettes } = useContext(PaletteContext);

  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState<IColor[]>([]);
  const [showAddPalette, setShowAddPalette] = useState(false);
  const [createPaletteStatus, setCreatePaletteStatus] = useState<
    number | undefined
  >();

  function closeModal(status?: number) {
    setShowAddPalette(false);
    setCreatePaletteStatus(status);
  }

  async function getImageColors(imageURI: string) {
    try {
      const result = await ImageColors.getColors(imageURI);

      setColors(
        Object.keys(result)
          .filter((key) => key !== 'platform' && result[key] !== '#000000')
          .map((key) => createColor(result[key], key)),
      );
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'erro ao capturar as cores da imagem.',
        visibilityTime: 3000,
      });
    }
  }

  function limpar() {
    setColors([]);
  }

  async function addPaletteFromImg() {
    setShowAddPalette(true);
  }

  useEffect(() => {
    if (createPaletteStatus && createPaletteStatus === 201 && colors.length) {
      setLoading(true);
      (async () => {
        const palettes = await getUserPalettes();

        try {
          await updatePalette(palettes[palettes.length - 1]._id, { colors });
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: error.response.data.message,
            visibilityTime: 3000,
          });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [createPaletteStatus]);

  return (
    <>
      {showAddPalette ? (
        <AddPalette onClose={closeModal} visible={showAddPalette} />
      ) : (
        <View></View>
      )}
      <Header option={false} title="Extrair Cor da Imagem" type="back" />
      <ExtractColorContainer>
        <Image
          source={{ uri: imgSource }}
          style={{ width: 250, height: 250 }}
        />
        <ButtonGroup>
          {!colors.length ? (
            <Button
              color="blue_light"
              onPress={() => getImageColors(imgSource)}>
              <ButtonLabel>Extrair Cores</ButtonLabel>
            </Button>
          ) : (
            <>
              <Button color="pink" onPress={limpar}>
                <ButtonLabel>Limpar</ButtonLabel>
              </Button>
              {loading ? (
                <Load />
              ) : (
                <Button color="success" onPress={addPaletteFromImg}>
                  <ButtonLabel>Criar Paleta</ButtonLabel>
                </Button>
              )}
            </>
          )}
        </ButtonGroup>
        <ColorsContainerScroll>
          <ColorsContainer>
            {colors.map((color) => (
              <ColorCard
                color={color}
                key={color._id}
                showTitle
                title={color.title}
              />
            ))}
          </ColorsContainer>
        </ColorsContainerScroll>
      </ExtractColorContainer>
    </>
  );
}
