import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BackHandler, FlatList, Modal, Text, View } from 'react-native';
import { IColor } from '../../@types';
import { AddPalette } from '../../components/AddPalette';
import { ColorCard } from '../../components/ColorCard';
import { FloatButton } from '../../components/FloatButton';

import { Header } from '../../components/Header';
import { PaletteCard } from '../../components/PaletteCard';
import { ForceUpdateProvider } from '../../context/forceUpdate';
import { PaletteContext } from '../../context/palette';

import { Container, SubTitle, Title } from './styles';

export function Home() {
  const [showAddPalette, setShowAddPalette] = useState(false);

  const { recentColors } = useContext(PaletteContext);

  function closeModal() {
    setShowAddPalette(false);
  }

  const renderItem = ({ item }) => <ColorCard key={item._id} color={item} />;

  function renderRecentColors() {
    if (!recentColors.length) return <SubTitle>Sem Cores Recentes</SubTitle>;
    const colorsToPrint = [...recentColors];
    return (
      <FlatList
        data={colorsToPrint.reverse()}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
  return (
    <>
      <Header type="logo" title="Where's My Color?" option={true} />
      <Container>
        <AddPalette onClose={closeModal} visible={showAddPalette} />
        <View>
          <Title>Cores Recentes</Title>
          {renderRecentColors()}
        </View>
        <Title>Paletas Recentes</Title>
        <PaletteCard />
        <Title>Paletas Favoritas</Title>
        <FloatButton
          onPress={() => setShowAddPalette(true)}
          right={15}
          bottom={15}
        />
      </Container>
    </>
  );
}
