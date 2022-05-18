import React from 'react';
import { Header } from '../../components/Header';

import { Container, Title } from './styles';

export function Home() {
  return (
    <>
      <Header type="logo" title="Where’s My Color?" option={true} />
      <Container>
        <Title>Minhas paletas</Title>
      </Container>
    </>
  );
}
