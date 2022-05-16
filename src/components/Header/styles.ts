import styled from 'styled-components/native';

import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View``;

export const HeaderContent = styled.View`
  width: 100%;
  height: 80px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: #181818;
  padding: 0 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;

  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

export const OptionButton = styled(TouchableOpacity)``;

export const NoOptionButton = styled(TouchableOpacity)`
  opacity: 0;
`;

export const Icon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(30)}px;

  padding: 5px;
`;
export const BackButton = styled(TouchableOpacity)``;

export const ModalContainer = styled.View`
  width: 80%;
  height: 300px;

  align-items: center;
  justify-content: space-between;
  padding: 20px 0;

  background-color: ${({ theme }) => theme.colors.white};

  margin: 40% 10%;

  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.background};
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;

  color: ${({ theme }) => theme.colors.title};
  text-align: center;
`;

export const Photo = styled(MaterialIcons)`
  font-size: ${RFValue(120)}px;
`;

export const ButtonConfig = styled(TouchableOpacity)``;

export const Config = styled.Text``;

export const LogOut = styled.Text``;

export const IconNotVisible = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(30)}px;

  padding: 5px;
`;
