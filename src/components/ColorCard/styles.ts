import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IColorCardProps {
  color: string;
}
export const Color = styled.TouchableOpacity`
  background-color: ${({ color }: IColorCardProps) => color};
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
