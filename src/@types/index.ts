import { Dispatch, SetStateAction } from 'react';

export type TUserPalettes = IPalette[];

export interface IColor {
  values: {
    hex: string;
    rgb: string;
  };
  title: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPalette {
  colors: IColor[];
  ownerId: string;
  name: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  membersId: string[];
  authorizeChange: string[];
  _id: string;
}

export interface IGetPalettesDataAxios {
  palettes: IPalette[];
}

export interface IGetPaletteDataAxios {
  palette: IPalette;
}

export interface IPaletteContext {
  palettes: IPalette[];
  recentColors: IColor[];
  recentPalettes: IPalette[];
  favoritePalettes: IPalette[];
  getUserPalettes: () => Promise<void>;
  shouldUpdatePalettes: boolean;
  setShouldUpdatePalettes: Dispatch<SetStateAction<boolean>>;
  getUserPalette: (paletteId: string) => Promise<IPalette>;
  deleteColor: (paletteId: string, colorId: string) => Promise<void>;
  deletePalette: (paletteId: string) => Promise<void>;
  updatePalette: (paletteId: string, data: { name: string }) => Promise<void>;
  addRecentColor: (color: IColor) => Promise<void>;
  getRecentColors: () => Promise<void>;
  addRecentPalette: (palette: IPalette) => Promise<void>;
  getRecentPalettes: () => Promise<void>;
  addFavoritePalette: (palette: IPalette) => Promise<void>;
  removeFavoritePalette: (palette: IPalette) => Promise<void>;
  getFavoritePalettes: () => Promise<void>;
}

export type TRecentColors = IColor[];
export type TRecentPalettes = IPalette[];

export interface IColorCardProps {
  color: IColor;
  paletteId?: string;
  title?: string;
  showTitle?: boolean;
}
export interface IPaletteCardProps {
  paletteId?: string;
  title?: string;
  showTitle?: boolean;
}

export interface IColorExtractProps {
  visible: boolean;
  onClose: () => void;
  imgSource: string;
}
