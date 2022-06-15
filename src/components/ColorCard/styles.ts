import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { IColorCardColor } from '../../@types';

export const Color = styled.TouchableOpacity<IColorCardColor>`
  background-color: ${({ color }) => color};
  width: ${RFValue(75)}px;
  height: ${RFValue(75)}px;
`;

export const ColorTitle = styled.Text`
  flex-wrap: wrap;
  text-align: center;
`;

export const CardWrapper = styled.View`
  width: ${RFValue(75)}px;
  margin: ${RFValue(10)}px;
  align-items: center;
`;
