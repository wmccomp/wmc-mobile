import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity<{ mode: 'select' | 'camera' }>`
  background-color: ${({ theme, mode }) =>
    mode === 'camera' ? theme.colors.pink : theme.colors.blue_light};

  padding: ${RFValue(10)}px;
  border-radius: 10px;
  margin: ${RFValue(18)}px;
`;

export const ButtonLabel = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.bold};
`;
