import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput)`
  width: ${RFValue(350)}px;
  height: ${RFValue(40)}px;
  background-color: ${({ theme }) => theme.colors.gray};

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;

  border-radius: 5px;
  margin-bottom: 30px;
`;
