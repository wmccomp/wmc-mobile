import React, { useContext, useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { wmcApi } from '../../api';
import { AddPalette } from '../../components/AddPalette';
import { ColorCard } from '../../components/ColorCard';
import { FloatButton } from '../../components/FloatButton';
import { Header } from '../../components/Header';
import { PalettePreview } from '../../components/PalettePreview';
import { LoginContext } from '../../context/auth';
import { PaletteContext } from '../../context/palette';

import { Container, ContainerScroll } from './styles';

type TUserPalettes = {
  colors: {
    values: {
      hex: string;
      rgb: string;
    };
    title: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  }[];
  ownerId: string;
  name: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  membersId: string[];
  authorizeChange: string[];
  _id: string;
}[];

export function MyPalettes() {
  const [showAddPalette, setShowAddPalette] = useState(false);

  const { palettes, setShouldUpdatePalettes } = useContext(PaletteContext);

  useEffect(() => {
    if (!showAddPalette) setShouldUpdatePalettes(true);
  }, [showAddPalette]);

  const closeModal = () => setShowAddPalette(false);
  useEffect(() => {}, []);
  return (
    <>
      <Header type="logo" title="Where's My Color?" option={true} />
      <AddPalette onClose={closeModal} visible={showAddPalette} />
      <Container>
        <ContainerScroll>
          {palettes.map((palette) => (
            <PalettePreview key={palette._id} palette={palette} />
          ))}
        </ContainerScroll>
        <FloatButton
          bottom={15}
          right={15}
          onPress={() => setShowAddPalette(true)}
        />
      </Container>
    </>
  );
}
