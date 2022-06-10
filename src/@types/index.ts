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
  getUserPalettes: () => Promise<void>;
  shouldUpdatePalettes: boolean;
  setShouldUpdatePalettes: Dispatch<SetStateAction<boolean>>;
  getUserPalette: (paletteId: string) => Promise<IPalette>;
  deleteColor: (paletteId: string, colorId: string) => Promise<void>;
}
