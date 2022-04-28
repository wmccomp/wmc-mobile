import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Content = styled.View`
  width: 100%;
  padding: 50px 40px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.title};
`;

export const RecentColors = styled.View`
  height: 145px;
`;

export const RecentPalettes = styled.View`
  height: 145px;
`;

export const FavoritePalettes = styled.View`
  height: 145px;
`;

export const ButtonAddPalete = styled.View`
  align-items: center;
  justify-content: center;
`;
