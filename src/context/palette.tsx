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
} from '../@types';
import { wmcApi } from '../api';
import { LoginContext } from './auth';

export const PaletteContext = createContext<IPaletteContext>(
  {} as IPaletteContext,
);

export function PaletteProvider({ children }: PropsWithChildren<{}>) {
  const [palettes, setPalettes] = useState<IPalette[]>([]);
  const [shouldUpdatePalettes, setShouldUpdatePalettes] = useState(false);
  const [recentColors, setRecentColors] = useState<IColor[]>([]);

  console.log(recentColors);

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
      (await AsyncStorage.getItem('@recent_colors')) || '[]';
    const colors: TRecentColors = JSON.parse(recentColorsJSON);

    if (colors.some((recentColor) => recentColor._id === color._id)) {
      return;
    }

    if (colors.length >= 6) {
      colors.shift();
    }

    colors.push(color);
    setRecentColors(colors);
    await AsyncStorage.setItem('@recent_colors', JSON.stringify(colors));
  }

  async function getRecentColors() {
    const recentColorsJSON = await AsyncStorage.getItem('@recent_colors');
    const colors: TRecentColors = JSON.parse(recentColorsJSON);

    setRecentColors(colors);
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
        getUserPalettes,
        shouldUpdatePalettes,
        setShouldUpdatePalettes,
        getUserPalette,
        deleteColor,
        deletePalette,
        updatePalette,
        addRecentColor,
        getRecentColors,
      }}>
      {children}
    </PaletteContext.Provider>
  );
}
