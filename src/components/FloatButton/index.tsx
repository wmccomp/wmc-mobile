import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Container } from './styles';
import theme from '../../global/styles/theme';

interface Props {
  onPress: () => void;
  bottom: number;
  right: number;
}

export function FloatButton({ onPress, bottom, right }: Props) {
  return (
    <Container bottom={bottom} right={right} onPress={onPress}>
      <Feather name={'plus'} size={35} color={theme.colors.white} />
    </Container>
  );
}
