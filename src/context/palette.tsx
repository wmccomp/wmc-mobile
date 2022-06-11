import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';
import {
  IGetPaletteDataAxios,
  IGetPalettesDataAxios,
  IPalette,
  IPaletteContext,
} from '../@types';
import { wmcApi } from '../api';
import { LoginContext } from './auth';

export const PaletteContext = createContext<IPaletteContext>(
  {} as IPaletteContext,
);

export function PaletteProvider({ children }: PropsWithChildren<{}>) {
  const [palettes, setPalettes] = useState<IPalette[]>([]);
  const [shouldUpdatePalettes, setShouldUpdatePalettes] = useState(false);

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
        getUserPalettes,
        shouldUpdatePalettes,
        setShouldUpdatePalettes,
        getUserPalette,
        deleteColor,
        deletePalette,
        updatePalette,
      }}>
      {children}
    </PaletteContext.Provider>
  );
}
