import { useState } from 'react';
import { IInputEditProps } from '../../@types';
import { EditButton, EditInputContainer, Icon, Input } from './styles';

export function InputEdit({ onChangeText, value }: IInputEditProps) {
  const [active, setActive] = useState(false);

  function handlePress() {
    setActive((prev) => !prev);
  }

  return (
    <EditInputContainer active={active}>
      <Input
        editable={active}
        value={value}
        onChangeText={onChangeText}
        placeholder="Nome Da Paleta"
        active={active}
      />
      <EditButton onPress={handlePress} active={active}>
        <Icon active={active} name="edit" />
      </EditButton>
    </EditInputContainer>
  );
}
