import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { IPalette } from '../../@types';
import { AppStackParamList } from '../../routes/app-stack.routes';
import { ColorCard } from '../ColorCard';
import { PaletteContainer, PaletteName, SubMessage } from './styles';

interface IPalettePreviewProps {
  palette: IPalette;
}

export function PalettePreview({ palette }: IPalettePreviewProps) {
  const { navigate }: NavigationProp<AppStackParamList> = useNavigation();

  const renderItem = ({ item }) => (
    <ColorCard paletteId={palette._id} color={item} />
  );
  const openPalette = () => {
    navigate('Palette', {
      palette,
    });
  };

  return (
    <PaletteContainer>
      <TouchableOpacity onPress={openPalette}>
        <PaletteName>{palette.name}</PaletteName>
      </TouchableOpacity>
      {palette.colors.length ? (
        <FlatList
          data={palette.colors}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <TouchableOpacity onPress={openPalette}>
          <SubMessage>Clique e adicione uma cor.</SubMessage>
        </TouchableOpacity>
      )}
    </PaletteContainer>
  );
}