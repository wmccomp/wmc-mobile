import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { AddPalette } from '../../components/AddPalette';

import { Header } from '../../components/Header';

import {
  Container,
  Content,
  Title,
  RecentColors,
  RecentPalettes,
  FavoritePalettes,
  ButtonAddPalete,
} from './styles';

export function Home() {
  const theme = useTheme();

  return (
    <>
      <Header type="logo" title="Where’s My Color?" />
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.black}
        translucent
      />
      <Container>
        <Content>
          <RecentColors>
            <Title>Cores Recentes</Title>
          </RecentColors>

          <RecentPalettes>
            <Title>Paletas Recentes</Title>
          </RecentPalettes>

          <FavoritePalettes>
            <Title>Paletas Favoritas</Title>
          </FavoritePalettes>

          <ButtonAddPalete>
            <AddPalette />
          </ButtonAddPalete>
        </Content>
      </Container>
    </>
  );
}
