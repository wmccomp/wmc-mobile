import styled from 'styled-components/native';
import { css } from 'styled-components';
import { IContainerProps } from '../../@types';

export const Container = styled.TouchableOpacity<IContainerProps>`
  width: 70px;
  height: 70px;
  align-items: center;
  justify-content: center;
  background-color: #156ce3;
  border-radius: 35px;
  position: absolute;
  ${({ bottom, right }) => css`
    bottom: ${bottom}px;
    right: ${right}px;
  `};
`;
