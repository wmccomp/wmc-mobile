import React, { useContext, useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { wmcApi } from '../../api';
import { ColorCard } from '../../components/ColorCard';
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
  const [palettes, setPalettes] = useState<TUserPalettes>([] as TUserPalettes);
  const { token } = useContext(LoginContext);
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
    <ContainerScroll>
      <Container>
        {palettes.map((palette) => (
          <PalettePreview palette={palette} />
        ))}
      </Container>
    </ContainerScroll>
  );
}
