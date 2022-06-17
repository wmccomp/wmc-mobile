import { Dispatch, ReactNode, SetStateAction } from 'react';

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
  userEasyAccess: IUserEasyAccess;
  palettes: IPalette[];
  getUserPalettes: () => Promise<IPalette[]>;
  shouldUpdatePalettes: boolean;
  setShouldUpdatePalettes: Dispatch<SetStateAction<boolean>>;
  getUserPalette: (paletteId: string) => Promise<IPalette>;
  deleteColor: (paletteId: string, colorId: string) => Promise<void>;
  deletePalette: (paletteId: string) => Promise<void>;
  updatePalette: (paletteId: string, data: IUpdatePalette) => Promise<void>;
  addRecentColor: (color: IColor) => Promise<void>;
  addRecentPalette: (palette: IPalette) => Promise<void>;
  addFavoritePalette: (palette: IPalette) => Promise<void>;
  removeFavoritePalette: (palette: IPalette) => Promise<void>;
}

export interface IUserEasyAccess {
  userId: string;
  recentColors: IColor[];
  recentPalettes: IPalette[];
  favoritePalettes: IPalette[];
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

export interface IUpdatePalette {
  colors?: IColor[];
  name?: string;
  isPublic?: boolean;
  membersId?: string[];
  authorizeChange?: string[];
}

export interface IImagePickerResult {
  cancelled: boolean;
  height: number;
  type: string;
  uri: string;
  width: number;
}

export interface ExtractColorButton {
  color: 'pink' | 'success' | 'blue_light';
}

export interface ISplashContext {
  showSplash: boolean;
  setShowSplash: Dispatch<SetStateAction<boolean>>;
}

export interface IForceUpdateProviderProps {
  forceUpdate: () => void;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginContext {
  token: string;
  user: IUserProfile;
  logIn: (data: ILoginData) => Promise<void>;
  logOut: () => void;
}

export interface IPreviewUserProfileProps {
  visible: boolean;
  onClose: () => void;
}

export interface IPalettePreviewProps {
  palette: IPalette;
}

export interface IPaletteOptionsButtonOption {
  color: 'attention' | 'shape';
}

export interface IPaletteCardColor {
  color: string;
}

export interface InterfaceModalCustomButtonOption {
  color: 'attention' | 'shape';
}

export interface IModalCustomProps {
  visible: boolean;
  onClose: () => void;
}

export interface IInputEditStyle {
  active: boolean;
}

export interface IInputEditProps {
  onChangeText?: (text: string) => void;
  value?: string;
}

export interface HeaderProps {
  type: 'logo' | 'back';
  title: string;
  paletteScreen?: boolean;
  option: boolean;
}

export interface IContainerProps {
  bottom: number;
  right: number;
}

export interface IFavoriteButtonProps {
  palette: IPalette;
}

export interface IColorOptionsButtonOption {
  color: 'attention' | 'shape';
}

export interface IColorOptionsProps {
  visible: boolean;
  onClose: () => void;
  paletteId: string;
  colorId: string;
  copyRGB: () => void;
}

export interface IColorCardColor {
  color: string;
}

export interface IAddColorProps {
  visible: boolean;
  onClose: () => void;
  paletteId: string;
}

export interface IUserProfile {
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  profilePicture: string;
  _id: string;
}
