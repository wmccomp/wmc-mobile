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
