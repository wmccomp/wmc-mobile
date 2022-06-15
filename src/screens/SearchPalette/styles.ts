import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 30px 18px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SearchBarContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.shape_ligth};
  padding: 8px;
  border-radius: 5px;
`;

export const SearchBarPalette = styled.TextInput`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.shape};
  padding-left: 8px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(24)}px;
  padding: 5px;
`;
