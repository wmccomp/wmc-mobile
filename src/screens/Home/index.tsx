import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { IColor } from '../../@types';
import { AddPalette } from '../../components/AddPalette';
import { ColorCard } from '../../components/ColorCard';
import { FloatButton } from '../../components/FloatButton';

import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { PaletteCard } from '../../components/PaletteCard';
import { PaletteContext } from '../../context/palette';
import { SplashContext } from '../../context/splash';

import { Container, SubTitle, Title } from './styles';

export function Home() {
  const [showAddPalette, setShowAddPalette] = useState(false);
  const [loadingColors, setLoadingColors] = useState(false);
  const [loadingPalettes, setLoadingPalettes] = useState(false);
  const [loadingFavoritePalettes, setLoadingFavoritePalettes] = useState(false);

  const { userEasyAccess } = useContext(PaletteContext);
  const { showSplash } = useContext(SplashContext);

  function closeModal() {
    setShowAddPalette(false);
  }

  function handleFloatButtonPress() {
    setShowAddPalette(true);
  }

  const renderItemColor = ({ item }) => (
    <ColorCard key={item._id} color={item} />
  );

  const renderItemPalette = ({ item }) => (
    <PaletteCard key={item._id} paletteId={item._id} />
  );

  function renderRecentColors() {
    if (!userEasyAccess.recentColors.length) {
      return <SubTitle>Sem Cores Recentes</SubTitle>;
    }

    const colorsToPrint = [...userEasyAccess.recentColors];

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
    if (!userEasyAccess.recentPalettes.length) {
      return <SubTitle>Sem Paletas Recentes</SubTitle>;
    }

    const palettesToPrint = [...userEasyAccess.recentPalettes];

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

  function renderFavoritePalettes() {
    if (!userEasyAccess.favoritePalettes.length) {
      return <SubTitle>Sem Paletas Favoritas</SubTitle>;
    }

    const palettesToPrint = [...userEasyAccess.favoritePalettes];

    return (
      <FlatList
        data={palettesToPrint}
        horizontal
        renderItem={renderItemPalette}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  useEffect(() => {
    showSplash &&
      Toast.show({
        type: 'info',
        text1: 'Bem vindo!',
        text2: 'Seja bem vindo à sua galeria',
        visibilityTime: 2000,
      });
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
        <View>
          {loadingFavoritePalettes ? <Load /> : renderFavoritePalettes()}
        </View>
        <FloatButton onPress={handleFloatButtonPress} right={15} bottom={15} />
      </Container>
    </>
  );
}
