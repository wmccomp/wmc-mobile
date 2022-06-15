import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { IPaletteOptionsButtonOption } from '../../@types';

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(25)}px;

  color: ${({ theme }) => theme.colors.title};
  text-align: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.blue};
  padding: ${RFValue(3)}px ${RFValue(10)}px;
  margin-top: ${RFValue(10)}px;
  border-radius: 10px;
`;

export const ButtonLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;

  color: ${({ theme }) => theme.colors.white};
`;

export const ButtonOption = styled.TouchableOpacity<IPaletteOptionsButtonOption>`
  background-color: ${({ theme, color }) => theme.colors[color]};
  padding: ${RFValue(3)}px ${RFValue(35)}px;
  margin-top: ${RFValue(10)}px;
  border-radius: 10px;
`;

export const ButtonGroup = styled.View`
  margin-top: ${RFValue(50)}px;
`;
