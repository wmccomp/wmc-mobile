import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const CloseModalArea = styled(TouchableOpacity)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  padding: 0 ${RFValue(20)}px;
  justify-content: center;
  align-items: center;
`;

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

export const ProfilePicture = styled.Image`
  width: ${RFValue(100)}px;
  height: ${RFValue(100)}px;
  border-radius: ${RFValue(50)}px;
  border: 4px solid ${({ theme }) => theme.colors.pink};
`;

export const ButtonConfig = styled(TouchableOpacity)``;

export const Config = styled.Text``;

export const LogOut = styled.Text``;

export const IconNotVisible = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(30)}px;
  padding: 5px;
`;
