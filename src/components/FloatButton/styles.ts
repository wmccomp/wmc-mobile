import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { css } from 'styled-components';
import { TouchableOpacity } from 'react-native';

interface IContainerProps {
  bottom: number;
  right: number;
}

export const Container = styled(TouchableOpacity)`
  width: 70px;
  height: 70px;

  align-items: center;
  justify-content: center;

  background-color: #156ce3;

  border-radius: 35px;
  position: absolute;
  ${({ bottom, right }: IContainerProps) => css`
    bottom: ${bottom}px;
    right: ${right}px;
  `};
`;
