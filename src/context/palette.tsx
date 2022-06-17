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
  IUpdatePalette,
  IUserEasyAccess,
} from '../@types';
import { wmcApi } from '../api';
import { LoginContext } from './auth';

export const PaletteContext = createContext<IPaletteContext>(
  {} as IPaletteContext,
);

const STORAGE_EASY_ACCESS = '@easy_access_storage';
const MAX_RECENT_COLORS = 6;
const MAX_RECENT_PALETTES = 6;
const USER_EASY_ACCESS_INITIAL_STATE = {
  userId: '',
  recentColors: [],
  recentPalettes: [],
  favoritePalettes: [],
};

export function PaletteProvider({ children }: PropsWithChildren<{}>) {
  const { token, user } = useContext(LoginContext);

  const [palettes, setPalettes] = useState<IPalette[]>([]);
  const [shouldUpdatePalettes, setShouldUpdatePalettes] = useState(false);
  const [userEasyAccess, setUserEasyAccess] = useState<IUserEasyAccess>(
    USER_EASY_ACCESS_INITIAL_STATE,
  );

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
      return data.palettes;
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

  async function updatePalette(paletteId: string, data: IUpdatePalette) {
    await wmcApi.put(`palette/${paletteId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await getUserPalettes();
  }

  async function getEasyAccessStorage() {
    const easyAccessStorageJSON =
      (await AsyncStorage.getItem(STORAGE_EASY_ACCESS)) || '[]';
    const easyAccessStorage: IUserEasyAccess[] = JSON.parse(
      easyAccessStorageJSON,
    );

    const userEAS = easyAccessStorage.find((usr) => user._id === usr.userId);

    if (!userEAS) {
      setUserEasyAccess({
        ...USER_EASY_ACCESS_INITIAL_STATE,
        userId: user._id,
      });
      return userEasyAccess;
    }

    setUserEasyAccess(userEAS);
    return userEAS;
  }

  async function saveEasyAccessStorage() {
    const easyAccessStorageJSON =
      (await AsyncStorage.getItem(STORAGE_EASY_ACCESS)) || '[]';
    const easyAccessStorage: IUserEasyAccess[] = JSON.parse(
      easyAccessStorageJSON,
    );

    const userEAS = easyAccessStorage.find(
      (usr) => userEasyAccess.userId === usr.userId,
    );

    if (!userEAS) {
      await AsyncStorage.setItem(
        STORAGE_EASY_ACCESS,
        JSON.stringify([...easyAccessStorage, userEasyAccess]),
      );
      return;
    }

    const newStorage = easyAccessStorage.map((usr) => {
      if (usr.userId === userEasyAccess.userId) return userEasyAccess;
      else return usr;
    });

    await AsyncStorage.setItem(STORAGE_EASY_ACCESS, JSON.stringify(newStorage));
  }

  async function addRecentColor(color: IColor) {
    if (
      userEasyAccess.recentColors.some(
        (recentColor) => recentColor._id === color._id,
      )
    ) {
      return;
    }

    if (userEasyAccess.recentColors.length >= MAX_RECENT_COLORS) {
      userEasyAccess.recentColors.shift();
    }

    userEasyAccess.recentColors.push(color);

    await saveEasyAccessStorage();
  }

  async function addRecentPalette(palette: IPalette) {
    if (
      userEasyAccess.recentPalettes.some(
        (recentPalette) => recentPalette._id === palette._id,
      )
    ) {
      return;
    }

    if (userEasyAccess.recentPalettes.length >= MAX_RECENT_PALETTES) {
      userEasyAccess.recentPalettes.shift();
    }

    userEasyAccess.recentPalettes.push(palette);

    await saveEasyAccessStorage();
  }

  async function addFavoritePalette(palette: IPalette) {
    if (
      userEasyAccess.favoritePalettes.some(
        (favoritePalette) => favoritePalette._id === palette._id,
      )
    ) {
      return;
    }

    userEasyAccess.favoritePalettes.push(palette);

    await saveEasyAccessStorage();
  }

  async function removeFavoritePalette(palette: IPalette) {
    if (
      !userEasyAccess.favoritePalettes.some(
        (favoritePalette) => favoritePalette._id === palette._id,
      )
    ) {
      return;
    }

    setUserEasyAccess((prev) => ({
      ...prev,
      favoritePalettes: prev.favoritePalettes.filter(
        (pal) => pal._id !== palette._id,
      ),
    }));

    await saveEasyAccessStorage();
  }

  useEffect(() => {
    if (shouldUpdatePalettes) {
      getUserPalettes();
      setShouldUpdatePalettes(false);
    }
  }, [shouldUpdatePalettes]);

  useEffect(() => {
    setUserEasyAccess((prev) => ({ ...prev, userId: user._id }));

    if (user._id) {
      getEasyAccessStorage();
    }
  }, [user._id]);

  return (
    <PaletteContext.Provider
      value={{
        userEasyAccess,
        palettes,
        getUserPalettes,
        shouldUpdatePalettes,
        setShouldUpdatePalettes,
        getUserPalette,
        deleteColor,
        deletePalette,
        updatePalette,
        addRecentColor,
        addRecentPalette,
        addFavoritePalette,
        removeFavoritePalette,
      }}>
      {children}
    </PaletteContext.Provider>
  );
}
