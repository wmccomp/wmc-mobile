import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BackHandler, FlatList, Modal, Text, View } from 'react-native';
import { IColor } from '../../@types';
import { AddPalette } from '../../components/AddPalette';
import { ColorCard } from '../../components/ColorCard';
import { FloatButton } from '../../components/FloatButton';

import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { PaletteCard } from '../../components/PaletteCard';
import { ForceUpdateProvider } from '../../context/forceUpdate';
import { PaletteContext } from '../../context/palette';

import { Container, SubTitle, Title } from './styles';

export function Home() {
  const [showAddPalette, setShowAddPalette] = useState(false);
  const [loadingColors, setLoadingColors] = useState(false);
  const [loadingPalettes, setLoadingPalettes] = useState(false);

  const { recentColors, recentPalettes, getRecentColors, getRecentPalettes } =
    useContext(PaletteContext);

  function closeModal() {
    setShowAddPalette(false);
  }

  const renderItemColor = ({ item }) => (
    <ColorCard key={item._id} color={item} />
  );
  const renderItemPalette = ({ item }) => (
    <PaletteCard key={item._id} paletteId={item._id} />
  );

  function renderRecentColors() {
    if (!recentColors.length) {
      return <SubTitle>Sem Cores Recentes</SubTitle>;
    }

    const colorsToPrint = [...recentColors];

    return (
      <FlatList
        data={colorsToPrint.reverse()}
        horizontal
        renderItem={renderItemColor}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  function renderRecentPalettes() {
    if (!recentPalettes.length) {
      return <SubTitle>Sem Paletas Recentes</SubTitle>;
    }

    const palettesToPrint = [...recentPalettes];

    return (
      <FlatList
        data={palettesToPrint.reverse()}
        horizontal
        renderItem={renderItemPalette}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  useEffect(() => {
    setLoadingColors(true);
    setLoadingPalettes(true);

    getRecentColors().then(() => setLoadingColors(false));
    getRecentPalettes().then(() => setLoadingPalettes(false));
  }, []);

  return (
    <>
      <Header type="logo" title="Where's My Color?" option={true} />
      <Container>
        <AddPalette onClose={closeModal} visible={showAddPalette} />
        <View>
          <Title>Cores Recentes</Title>
          {loadingColors ? <Load /> : renderRecentColors()}
        </View>
        <Title>Paletas Recentes</Title>
        <View>{loadingPalettes ? <Load /> : renderRecentPalettes()}</View>
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
