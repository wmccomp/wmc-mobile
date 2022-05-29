import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 70px;
  height: 70px;

  align-items: center;
  justify-content: center;

  background-color: #156ce3;

  border-radius: 35px;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.25);
`;
