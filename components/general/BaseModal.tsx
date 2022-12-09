import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Center,
  Container,
} from "@chakra-ui/react";
import React from "react";

export default function BaseModal(props: any) {
  const isOpen = props.modal;
  const onClose = props.showModal;
  const ChildComponent = props.ChildComponent;

  return (
    <Modal
      isCentered={true}
      size={"lg"}
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={() => {
        onClose(false);
      }}
    >
      <ModalOverlay />
      <ModalContent w={"100vw"} bg="background.tabs">
        <ModalHeader></ModalHeader>
        <ModalCloseButton color="primary.gray" />
        <Container>
          <ModalBody color="primary.gray">
            <ChildComponent
              onClose={() => {
                onClose(false);
              }}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Container>
      </ModalContent>
    </Modal>
  );
}
