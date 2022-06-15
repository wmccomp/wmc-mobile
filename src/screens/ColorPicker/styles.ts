import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity<{ mode: 'select' | 'camera' }>`
  background-color: ${({ theme, mode }) =>
    mode === 'camera' ? theme.colors.pink : theme.colors.blue_light};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: ${RFValue(5)}px ${RFValue(10)}px;
  border-radius: 5px;
  margin: ${RFValue(18)}px;
`;

export const ButtonLabel = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.regular};
  text-transform: uppercase;
  font-size: ${RFValue(18)}px;
`;

export const Icon = styled(Feather)`
  font-size: 18px;
  margin: 0 5px;
  color: ${({ theme }) => theme.colors.white};
`;
