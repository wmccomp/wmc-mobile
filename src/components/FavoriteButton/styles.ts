import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const FavoriteButtonStyle = styled(FontAwesome)<{ favorite: boolean }>`
  color: ${({ theme, favorite }) =>
    favorite ? theme.colors.attention : 'lightgray'};
  font-size: ${RFValue(16)}px;
`;
