import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { AppStackParamList } from '../../routes/app-stack.routes';
import { ColorCard } from '../ColorCard';
import { PaletteContainer, PaletteName } from './styles';

interface IPalette {
  colors: any[];
  ownerId: string;
  name: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  membersId: string[];
  authorizeChange: string[];
  _id: string;
}

interface IPalettePreviewProps {
  palette: IPalette;
}

export function PalettePreview({ palette }: IPalettePreviewProps) {
  const { navigate }: NavigationProp<AppStackParamList> = useNavigation();

  const renderItem = ({ item }) => <ColorCard color={item.values.hex} />;
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
      <FlatList data={palette.colors} horizontal renderItem={renderItem} />
    </PaletteContainer>
  );
}
