import React from 'react';

import { Container, ErrorContent, ErrorMessage } from './styles';

interface Props {
  title: string;
}

export function InputError({ title }: Props) {
  return (
    <Container>
      <ErrorContent>
        <ErrorMessage>{title}</ErrorMessage>
      </ErrorContent>
    </Container>
  );
}
