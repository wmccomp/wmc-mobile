import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { IPalette, IPalettePreviewProps } from '../../@types';
import { PaletteContext } from '../../context/palette';
import { AppStackParamList } from '../../routes/app-stack.routes';
import { ColorCard } from '../ColorCard';
import { PaletteOptions } from '../PaletteOptions';
import {
  HeaderContainer,
  PaletteContainer,
  PaletteName,
  SubMessage,
} from './styles';
import { FavoriteButton } from '../FavoriteButton';

export function PalettePreview({ palette }: IPalettePreviewProps) {
  const [showPaletteOptions, setShowPaletteOptions] = useState(false);

  const { navigate }: NavigationProp<AppStackParamList> = useNavigation();
  const { addRecentPalette } = useContext(PaletteContext);
  const renderItem = ({ item }) => (
    <ColorCard paletteId={palette._id} color={item} />
  );
  const openPalette = () => {
    addRecentPalette(palette);
    navigate('Palette', {
      palette,
    });
  };

  return (
    <>
      {showPaletteOptions && (
        <PaletteOptions
          paletteId={palette._id}
          visible={showPaletteOptions}
          onClose={() => setShowPaletteOptions(false)}
        />
      )}
      <PaletteContainer>
        <HeaderContainer>
          <TouchableOpacity
            onLongPress={() => setShowPaletteOptions(true)}
            onPress={openPalette}>
            <PaletteName>{palette.name}</PaletteName>
          </TouchableOpacity>
          <FavoriteButton palette={palette} />
        </HeaderContainer>
        {palette.colors.length ? (
          <FlatList
            data={palette.colors}
            horizontal
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <TouchableOpacity onPress={openPalette}>
            <SubMessage>Clique e adicione uma cor.</SubMessage>
          </TouchableOpacity>
        )}
      </PaletteContainer>
    </>
  );
}
