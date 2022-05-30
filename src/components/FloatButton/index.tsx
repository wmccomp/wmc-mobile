import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Container } from './styles';
import theme from '../../global/styles/theme';

interface Props {
  onPress: () => void;
}

export function FloatButton({ onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <Feather name={'plus'} size={35} color={theme.colors.white} />
    </Container>
  );
}
