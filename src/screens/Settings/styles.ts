import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: flex-start;

  margin-top: 30px;
  margin-bottom: 30px;
`;

export const Photo = styled(MaterialIcons)`
  font-size: ${RFValue(120)}px;
`;

export const Form = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Fields = styled.View`
  margin-bottom: 10px;
`;
