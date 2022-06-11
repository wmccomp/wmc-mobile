import { useContext, useEffect, useState } from 'react';
import { IColor, IPaletteCardProps } from '../../@types';
import { PaletteContext } from '../../context/palette';

import { CardWrapper, Color } from './styles';

export function PaletteCard({ paletteId }: IPaletteCardProps) {
  const { getUserPalette } = useContext(PaletteContext);
  const [colors, setColors] = useState<IColor[]>([]);

  function renderColors() {
    const colorsToRender = colors.filter((_, index) => index < 4);

    if (colorsToRender.length < 4) {
      for (let index = 0; index < colorsToRender.length; index++) {
        return !!colorsToRender[index] ? (
          <Color
            key={colorsToRender[index]._id}
            color={colorsToRender[index].values.hex}
          />
        ) : (
          <Color key={index} color="#FFFFFF" />
        );
      }
    }
    return colorsToRender.map((color) => (
      <Color key={color._id} color={color.values.hex} />
    ));
  }

  useEffect(() => {
    getUserPalette(paletteId).then((palette) => setColors(palette.colors));
  }, []);
  return <CardWrapper>{renderColors()}</CardWrapper>;
}
