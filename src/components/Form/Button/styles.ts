import styled from 'styled-components/native';

import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
  width: ${RFValue(250)}px;
  height: ${RFValue(45)}px;
  background-color: ${({ theme }) => theme.colors.blue};

  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.white};
`;
