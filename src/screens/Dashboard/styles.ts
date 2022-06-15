import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(55)}px 0;
`;

export const Title = styled.Text`
  font-size: ${RFValue(44)}px;
  font-family: ${({ theme }) => theme.fonts.light};
  color: ${({ theme }) => theme.colors.black};
  margin: 30px 10px;
`;

export const Descript = styled.Text`
  text-align: center;
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.light};
  color: ${({ theme }) => theme.colors.black};
`;

export const ButtonWrapper = styled.View`
  margin-top: 50px;
`;

export const LoginContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const LoginText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.black};
`;

export const Pressable = styled.Pressable``;

export const ButtonLogin = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.blue};
`;
