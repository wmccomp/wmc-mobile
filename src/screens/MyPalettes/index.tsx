import React, { useContext, useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { wmcApi } from '../../api';
import { LoginContext } from '../../context/auth';

import { Container } from './styles';

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
    <Container>
      {palettes.map(({ _id, name }) => (
        <View key={_id}>
          <Text>{name}</Text>
        </View>
      ))}
    </Container>
  );
}
