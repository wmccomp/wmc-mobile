import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { ExtractColorButton } from '../../@types';

export const ExtractColorContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 10px;
`;

export const Image = styled.Image`
  width: ${RFValue(250)}px;
  height: ${RFValue(250)}px;
  border-radius: 10px;
`;

export const Button = styled.TouchableOpacity<ExtractColorButton>`
  background-color: ${({ theme, color }) => theme.colors[color]};
  flex: 1;
  padding: 5px 5px;
  border-radius: 5px;
  margin: 5px;
  align-items: center;
  justify-content: center;
`;

export const ButtonLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(16)}px;
  text-align: center;
`;

export const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 10px;
`;

export const ColorsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ColorsContainerScroll = styled.ScrollView`
  flex: 1;
`;
