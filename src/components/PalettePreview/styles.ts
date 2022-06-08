import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const PaletteContainer = styled.View`
  width: 100%;
`;
export const PaletteName = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const SubMessage = styled.Text`
  margin-left: 25px;
`;
