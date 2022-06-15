import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Animation = styled(LottieView)`
  width: ${RFValue(200)}px;
  height: ${RFValue(200)}px;
`;
