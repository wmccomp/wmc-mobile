import { IColor } from '../@types';
import uuid from 'react-native-uuid';
import md5 from 'md5';

export function generateValues(color: string) {
  const colorSplit = color.substring(1).match(/.{2}/g);

  const rgbArr = colorSplit
    ? colorSplit.map((char) => parseInt(char, 16))
    : [0, 0, 0];
  const rgb = rgbArr.reduce((acc, num) => `${acc}${num}, `, '');

  return {
    hex: color,
    rgb: `(${rgb.substring(0, rgb.length - 2)})`,
  };
}

export function createColor(color: string, title?: string): IColor {
  const result = {
    _id: `${uuid.v4()}`,
    createdAt: Date.now().toLocaleString(),
    updatedAt: Date.now().toLocaleString(),
    title,
    values: generateValues(color),
  };

  return result;
}

export function hashEmail(email: string) {
  return md5(email);
}
