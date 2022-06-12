import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { IColor, IPalette, IPaletteCardProps } from '../../@types';
import { PaletteContext } from '../../context/palette';
import { AppStackParamList } from '../../routes/app-stack.routes';
import { Load } from '../Load';

import { CardWrapper, Color } from './styles';

export function PaletteCard({ paletteId }: IPaletteCardProps) {
  const { getUserPalette } = useContext(PaletteContext);
  const { navigate }: NavigationProp<AppStackParamList> = useNavigation();

  const [colors, setColors] = useState<IColor[]>([]);
  const [palette, setPalette] = useState<IPalette>({} as IPalette);
  const [loading, setLoading] = useState(false);

  function renderColors() {
    const colorsToRender = colors.filter((_, index) => index < 4);

    if (colorsToRender.length < 4) {
      let render = [];
      for (let index = 0; index < colorsToRender.length; index++) {
        render.push(
          <Color
            key={colorsToRender[index]._id}
            color={colorsToRender[index].values.hex}
          />,
        );
      }

      return render;
    }
    return colorsToRender.map((color) => (
      <Color key={color._id} color={color.values.hex} />
    ));
  }

  useEffect(() => {
    setLoading(true);
    getUserPalette(paletteId).then((palette) => {
      setLoading(false);
      setPalette(palette);
      setColors(palette.colors);
    });
  }, []);
  return (
    <CardWrapper
      onPress={() => {
        navigate('Palette', { palette });
      }}>
      {loading ? <Load /> : renderColors()}
    </CardWrapper>
  );
}
