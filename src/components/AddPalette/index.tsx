import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { Container, Title } from './styles';

export function AddPalette() {
  const theme = useTheme();

  return (
    <Container>
      <Feather name="plus" size={20} style={{ color: theme.colors.blue }} />
      <Title>NOVO</Title>
    </Container>
  );
}
