import { PropsWithChildren } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { IModalCustomProps } from '../../@types';

import { CloseModalArea, Container } from './styles';

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
