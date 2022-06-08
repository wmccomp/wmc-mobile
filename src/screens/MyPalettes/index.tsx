import React, { useContext, useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { wmcApi } from '../../api';
import { AddPalette } from '../../components/AddPalette';
import { ColorCard } from '../../components/ColorCard';
import { FloatButton } from '../../components/FloatButton';
import { Header } from '../../components/Header';
import { PalettePreview } from '../../components/PalettePreview';
import { LoginContext } from '../../context/auth';

import { Container, ContainerScroll } from './styles';

type TUserPalettes = {
  colors: any[];
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
  const [palettes, setPalettes] = useState<TUserPalettes>([] as TUserPalettes);
  const { token } = useContext(LoginContext);

  const closeModal = () => setShowAddPalette(false);
  useEffect(() => {
    wmcApi
      .get('user/palettes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setPalettes(data.palettes);
      })
      .catch((err) => {
        Alert.alert('Erro', err.response.data.message);
      });
  }, []);
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
