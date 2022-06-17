import { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { IFavoriteButtonProps } from '../../@types';
import { PaletteContext } from '../../context/palette';
import { FavoriteButtonStyle } from './styles';

export function FavoriteButton({ palette }: IFavoriteButtonProps) {
  const { userEasyAccess, addFavoritePalette, removeFavoritePalette } =
    useContext(PaletteContext);
  const [favorite, setFavorite] = useState(
    userEasyAccess.favoritePalettes.some((pal) => palette._id === pal._id),
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
