import React from 'react';

import { Header } from '../../components/Header';

import {
  Container,
  SearchBarContainer,
  SearchBarPalette,
  Icon,
} from './styles';

export function SearchPalette() {
  return (
    <>
      <Header type="logo" title="Pesquisar paletas" option={true} />
      <Container>
        <SearchBarContainer>
          <Icon name="search" />
          <SearchBarPalette placeholder="Nome da paleta" />
        </SearchBarContainer>
      </Container>
    </>
  );
}
