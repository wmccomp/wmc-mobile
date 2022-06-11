import { PropsWithChildren } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';

import { CloseModalArea, Container } from './styles';

interface IModalCustomProps {
  visible: boolean;
  onClose: () => void;
}

export function ModalCustom({
  onClose,
  visible,
  children,
}: PropsWithChildren<IModalCustomProps>) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <CloseModalArea onPress={onClose}>
        <TouchableWithoutFeedback>
          <Container>{children}</Container>
        </TouchableWithoutFeedback>
      </CloseModalArea>
    </Modal>
  );
}
