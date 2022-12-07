import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const logOutIcon = <FontAwesomeIcon icon={faArrowRightFromBracket} />;

function VerticallyCenter() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isOpen === true) {
    localStorage.removeItem("token");
  }

  return (
    <>
      <div onClick={onOpen}>{logOutIcon}</div>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logged Out!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>You Logged Out! See you next time</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default VerticallyCenter;
