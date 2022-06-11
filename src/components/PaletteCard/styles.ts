import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IColorCardProps {
  color: string;
}

export const Color = styled.View<{ color: string }>`
  width: ${RFValue(32.5)}px;
  height: ${RFValue(32.5)}px;
  margin: 0 5px 5px 0;
  background-color: ${({ color }) => color ?? 'black'};
`;

export const CardWrapper = styled.TouchableOpacity`
  width: ${RFValue(75)}px;
  height: ${RFValue(75)}px;
  margin: ${RFValue(10)}px;
  flex-direction: row;
  flex-wrap: wrap;

  &:last-child {
    margin: 0;
  }
`;
