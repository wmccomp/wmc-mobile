import React, { useContext, useEffect, useState } from 'react';
import { AddPalette } from '../../components/AddPalette';
import { FloatButton } from '../../components/FloatButton';
import { Header } from '../../components/Header';
import { PalettePreview } from '../../components/PalettePreview';
import { PaletteContext } from '../../context/palette';

import { Container, ContainerScroll } from './styles';

export function MyPalettes() {
  const [showAddPalette, setShowAddPalette] = useState(false);

  const { palettes, setShouldUpdatePalettes } = useContext(PaletteContext);

  useEffect(() => {
    if (!showAddPalette) setShouldUpdatePalettes(true);
  }, [showAddPalette]);

  function closeModal() {
    setShowAddPalette(false);
  }

  function handleFloatButtonPress() {
    setShowAddPalette(true);
  }

  return (
    <>
      <Header type="logo" title="Minhas Paletas" option={true} />
      <AddPalette onClose={closeModal} visible={showAddPalette} />
      <Container>
        <ContainerScroll showsVerticalScrollIndicator={false}>
          {palettes.map((palette) => (
            <PalettePreview key={palette._id} palette={palette} />
          ))}
        </ContainerScroll>
        <FloatButton bottom={15} right={15} onPress={handleFloatButtonPress} />
      </Container>
    </>
  );
}
