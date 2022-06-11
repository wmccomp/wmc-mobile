import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IInputEditStyle {
  active: boolean;
}

const EditInputContainer = styled.View<IInputEditStyle>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
`;

const Input = styled.TextInput<IInputEditStyle>`
  flex: 1;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, active }) =>
    active ? theme.colors.blue_light : '#b1b0b0'};
  padding: 0 10px;
  font-size: ${RFValue(16)}px;
  color: ${({ active }) => (active ? 'black' : '#b1b0b0')};
`;

const EditButton = styled.TouchableOpacity<IInputEditStyle>`
  border-left-width: 3px;
  border-left-color: ${({ theme, active }) =>
    active ? theme.colors.blue_light : '#b1b0b0'};
  padding: 7px 10px;
  margin-left: 10px;
`;

const Icon = styled(Feather)<IInputEditStyle>`
  font-size: ${RFValue(20)}px;
  color: ${({ theme, active }) =>
    active ? theme.colors.blue_light : '#b1b0b0'};
`;

interface IInputEditProps {
  onChangeText?: (text: string) => void;
  value?: string;
}

export function InputEdit({ onChangeText, value }: IInputEditProps) {
  const [active, setActive] = useState(false);

  return (
    <EditInputContainer active={active}>
      <Input
        editable={active}
        value={value}
        onChangeText={onChangeText}
        placeholder="Nome Da Paleta"
        active={active}
      />
      <EditButton onPress={() => setActive((prev) => !prev)} active={active}>
        <Icon active={active} name="edit" />
      </EditButton>
    </EditInputContainer>
  );
}
