import { RouteProp, useRoute } from '@react-navigation/native';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { IColor } from '../../@types';
import { AddColor } from '../../components/AddColor';
import { ColorCard } from '../../components/ColorCard';
import { FloatButton } from '../../components/FloatButton';
import { Header } from '../../components/Header';
import { ForceUpdateProvider } from '../../context/forceUpdate';
import { PaletteContext } from '../../context/palette';
import { AppStackParamList } from '../../routes/app-stack.routes';
import { PaletteContainer, PaletteContainerScroll } from './styles';

export function Palette() {
  const {
    params: { palette },
  } = useRoute<RouteProp<AppStackParamList>>();

  const [showAddColor, setShowAddColor] = useState(false);
  const [colors, setColors] = useState<IColor[]>([]);
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  const { setShouldUpdatePalettes, getUserPalette } =
    useContext(PaletteContext);

  function closeModal() {
    setShowAddColor(false);
  }

  async function getColors() {
    try {
      const { colors: newColors } = await getUserPalette(palette._id);
      setColors(newColors);
    } catch (error) {
      Alert.alert('Erro', error.response.data.message);
    }
  }

  useEffect(() => {
    getColors();
  }, []);

  useEffect(() => {
    if (!showAddColor) {
      setShouldUpdatePalettes(true);
      getColors();
    }
  }, [showAddColor]);

  return (
    <ForceUpdateProvider forceUpdate={forceUpdate}>
      <AddColor
        paletteId={palette._id}
        visible={showAddColor}
        onClose={closeModal}
      />
      <Header type="back" title={palette.name} option={true} paletteScreen />
      <PaletteContainer>
        <PaletteContainerScroll
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          {colors.map((color) => (
            <ColorCard
              key={color._id}
              title={color.title}
              showTitle
              color={color}
              paletteId={palette._id}
            />
          ))}
        </PaletteContainerScroll>
        <FloatButton
          bottom={15}
          right={15}
          onPress={() => setShowAddColor(true)}
        />
      </PaletteContainer>
    </ForceUpdateProvider>
  );
}
