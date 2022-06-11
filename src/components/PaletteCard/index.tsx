import { useContext, useState } from 'react';
import { IPaletteCardProps } from '../../@types';
import { PaletteContext } from '../../context/palette';

import { CardWrapper, Color } from './styles';

export function PaletteCard({ paletteId }: IPaletteCardProps) {
  const { getUserPalette } = useContext(PaletteContext);

  return (
    <CardWrapper>
      <Color color="red" />
      <Color color="green" />
      <Color color="blue" />
      <Color color="yellow" />
    </CardWrapper>
  );
}
