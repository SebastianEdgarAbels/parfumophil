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

import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const logOutIcon = <FontAwesomeIcon icon={faArrowRightFromBracket} />;

function VerticallyCenter() {
  console.log("modal run");
  const { logout } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isOpen === true) {
    // localStorage.removeItem("token");
    logout();
  }

  return (
    <>
      {/* <input
        type="text"
        onClick={onOpen}
        id="icon"
        placeholder="Logout"
      ></input>
      <label htmlFor="icon">{logOutIcon}</label> */}

      <div onClick={onOpen} className="text-xl">
        {logOutIcon}
      </div>
      <div onClick={onOpen} className="text-xl">
        Logout
      </div>

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
