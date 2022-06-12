import { Feather, FontAwesome } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { IPalette } from '../../@types';
import { PaletteContext } from '../../context/palette';
import { Load } from '../Load';

export const FavoriteButtonStyle = styled(FontAwesome)<{ favorite: boolean }>`
  color: ${({ theme, favorite }) =>
    favorite ? theme.colors.attention : 'lightgray'};
  font-size: ${RFValue(16)}px;
`;

export interface IFavoriteButtonProps {
  palette: IPalette;
}

export function FavoriteButton({ palette }: IFavoriteButtonProps) {
  const { favoritePalettes, addFavoritePalette, removeFavoritePalette } =
    useContext(PaletteContext);
  const [favorite, setFavorite] = useState(
    favoritePalettes.some((pal) => palette._id === pal._id),
  );

  async function handleToggleFavoriteButton() {
    if (favorite) {
      await removeFavoritePalette(palette);
      setFavorite(false);
    } else {
      await addFavoritePalette(palette);
      setFavorite(true);
    }
  }

  return (
    <TouchableOpacity onPress={handleToggleFavoriteButton}>
      <FavoriteButtonStyle favorite={favorite} name="heart" />
    </TouchableOpacity>
  );
}
