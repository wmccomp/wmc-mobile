import React, { useEffect, useState } from 'react';
import { BackHandler, Modal } from 'react-native';
import { AddPalette } from '../../components/AddPalette';
import { FloatButton } from '../../components/FloatButton';

import { Header } from '../../components/Header';

import { Container, Title } from './styles';

export function Home() {
  const [showAddPalette, setShowAddPalette] = useState(false);
  const closeModal = () => setShowAddPalette(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return true;
      });
    };
  }, []);
  return (
    <>
      <Header type="logo" title="Where's My Color?" option={true} />
      <Container>
        <AddPalette onClose={closeModal} visible={showAddPalette} />
        <Title>Minhas paletas</Title>
        <FloatButton
          onPress={() => setShowAddPalette(true)}
          right={15}
          bottom={15}
        />
      </Container>
    </>
  );
}
