import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.light};
  color: ${({ theme }) => theme.colors.title};
  margin: 30px 0 40px;
`;

export const Form = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Fields = styled.View`
  margin-bottom: 10px;
`;
