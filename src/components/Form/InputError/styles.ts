import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
`;

export const ErrorContent = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: -30px;
  margin-bottom: 10px;
`;

export const ErrorMessage = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.attention};
  margin: 7px 0;
`;
