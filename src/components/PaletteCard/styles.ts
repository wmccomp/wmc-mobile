import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { IPaletteCardColor } from '../../@types';

export const Color = styled.View<IPaletteCardColor>`
  width: ${RFValue(35)}px;
  height: ${RFValue(35)}px;
  margin: 0 2.5px 2.5px 0;
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
