import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';

import {
  IColor,
  IGetPaletteDataAxios,
  IGetPalettesDataAxios,
  IPalette,
  IPaletteContext,
  TRecentColors,
  TRecentPalettes,
} from '../@types';
import { wmcApi } from '../api';
import { LoginContext } from './auth';

export const PaletteContext = createContext<IPaletteContext>(
  {} as IPaletteContext,
);

const STORAGE_RECENT_COLORS_KEY = '@recent_colors';
const STORAGE_RECENT_PALETTES_KEY = '@recent_palettes';
const STORAGE_FAVORITE_PALETTES_KEY = '@favorite_palettes';
const MAX_RECENT_COLORS = 6;
const MAX_RECENT_PALETTES = 6;

export function PaletteProvider({ children }: PropsWithChildren<{}>) {
  const [palettes, setPalettes] = useState<IPalette[]>([]);
  const [shouldUpdatePalettes, setShouldUpdatePalettes] = useState(false);
  const [recentColors, setRecentColors] = useState<IColor[]>([]);
  const [recentPalettes, setRecentPalettes] = useState<IPalette[]>([]);
  const [favoritePalettes, setFavoritePalettes] = useState<IPalette[]>([]);

  const { token } = useContext(LoginContext);

  async function getUserPalettes() {
    try {
      const { data } = await wmcApi.get<IGetPalettesDataAxios>(
        'user/palettes',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPalettes(data.palettes);
    } catch (err) {
      Alert.alert('Erro', err.response.data.message);
    }
  }

  async function getUserPalette(paletteId: string): Promise<IPalette> {
    const { data } = await wmcApi.get<IGetPaletteDataAxios>(
      `palette/${paletteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data.palette;
  }

  async function deleteColor(paletteId: string, colorId: string) {
    await wmcApi.delete(`color/delete/${paletteId}/${colorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function deletePalette(paletteId: string) {
    await wmcApi.delete(`palette/${paletteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await getUserPalettes();
  }

  async function updatePalette(paletteId: string, data: { name: string }) {
    await wmcApi.put(`palette/${paletteId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await getUserPalettes();
  }

  async function addRecentColor(color: IColor) {
    const recentColorsJSON =
      (await AsyncStorage.getItem(STORAGE_RECENT_COLORS_KEY)) || '[]';
    const colors: TRecentColors = JSON.parse(recentColorsJSON);

    if (colors.some((recentColor) => recentColor._id === color._id)) {
      return;
    }

    if (colors.length >= MAX_RECENT_COLORS) {
      colors.shift();
    }

    colors.push(color);

    await AsyncStorage.setItem(
      STORAGE_RECENT_COLORS_KEY,
      JSON.stringify(colors),
    );
  }

  async function getRecentColors() {
    const recentColorsJSON =
      (await AsyncStorage.getItem(STORAGE_RECENT_COLORS_KEY)) || '[]';
    const colors: TRecentColors = JSON.parse(recentColorsJSON);

    setRecentColors(colors);
  }

  async function addRecentPalette(palette: IPalette) {
    const recentPalettesJSON =
      (await AsyncStorage.getItem(STORAGE_RECENT_PALETTES_KEY)) || '[]';
    const palettes: TRecentPalettes = JSON.parse(recentPalettesJSON);

    if (palettes.some((recentPalette) => recentPalette._id === palette._id)) {
      return;
    }

    if (palettes.length >= MAX_RECENT_PALETTES) {
      palettes.shift();
    }

    palettes.push(palette);

    await AsyncStorage.setItem(
      STORAGE_RECENT_PALETTES_KEY,
      JSON.stringify(palettes),
    );
  }

  async function getRecentPalettes() {
    const recentPalettesJSON =
      (await AsyncStorage.getItem(STORAGE_RECENT_PALETTES_KEY)) || '[]';
    const palettes: TRecentPalettes = JSON.parse(recentPalettesJSON);

    setRecentPalettes(palettes);
  }

  async function addFavoritePalette(palette: IPalette) {
    const favoritePalettesJSON =
      (await AsyncStorage.getItem(STORAGE_FAVORITE_PALETTES_KEY)) || '[]';
    const palettes: TRecentPalettes = JSON.parse(favoritePalettesJSON);

    if (
      palettes.some((favoritePalette) => favoritePalette._id === palette._id)
    ) {
      return;
    }

    palettes.push(palette);

    await AsyncStorage.setItem(
      STORAGE_FAVORITE_PALETTES_KEY,
      JSON.stringify(palettes),
    );
  }

  async function removeFavoritePalette(palette: IPalette) {
    const favoritePalettesJSON =
      (await AsyncStorage.getItem(STORAGE_FAVORITE_PALETTES_KEY)) || '[]';
    const palettes: TRecentPalettes = JSON.parse(favoritePalettesJSON);

    if (
      !palettes.some((favoritePalette) => favoritePalette._id === palette._id)
    ) {
      return;
    }

    await AsyncStorage.setItem(
      STORAGE_FAVORITE_PALETTES_KEY,
      JSON.stringify(palettes.filter((pal) => pal._id !== palette._id)),
    );
  }

  async function getFavoritePalettes() {
    const favoritePalettesJSON =
      (await AsyncStorage.getItem(STORAGE_FAVORITE_PALETTES_KEY)) || '[]';
    const palettes: TRecentPalettes = JSON.parse(favoritePalettesJSON);

    setFavoritePalettes(palettes);
  }

  useEffect(() => {
    if (shouldUpdatePalettes) {
      getUserPalettes();
      setShouldUpdatePalettes(false);
    }
  }, [shouldUpdatePalettes]);

  return (
    <PaletteContext.Provider
      value={{
        palettes,
        recentColors,
        recentPalettes,
        favoritePalettes,
        getUserPalettes,
        shouldUpdatePalettes,
        setShouldUpdatePalettes,
        getUserPalette,
        deleteColor,
        deletePalette,
        updatePalette,
        addRecentColor,
        getRecentColors,
        addRecentPalette,
        getRecentPalettes,
        addFavoritePalette,
        removeFavoritePalette,
        getFavoritePalettes,
      }}>
      {children}
    </PaletteContext.Provider>
  );
}
