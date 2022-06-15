import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { IInputEditStyle } from '../../@types';

export const EditInputContainer = styled.View<IInputEditStyle>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
`;

export const Input = styled.TextInput<IInputEditStyle>`
  flex: 1;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, active }) =>
    active ? theme.colors.blue_light : '#b1b0b0'};
  padding: 0 10px;
  font-size: ${RFValue(16)}px;
  color: ${({ active }) => (active ? 'black' : '#b1b0b0')};
`;

export const EditButton = styled.TouchableOpacity<IInputEditStyle>`
  border-left-width: 3px;
  border-left-color: ${({ theme, active }) =>
    active ? theme.colors.blue_light : '#b1b0b0'};
  padding: 7px 10px;
  margin-left: 10px;
`;

export const Icon = styled(Feather)<IInputEditStyle>`
  font-size: ${RFValue(20)}px;
  color: ${({ theme, active }) =>
    active ? theme.colors.blue_light : '#b1b0b0'};
`;
