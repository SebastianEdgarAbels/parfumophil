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
  // console.log("modal run");
  const { logout, setUserLogged } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // if (isOpen === true) {
  //   localStorage.removeItem("token");
  //   // logout();
  // so because everytime I change smth that's on a state, the whole components which have that state will render (react) so the modal when I put it
  // like this onOpen,the modal will open but just for a fraction of second ( the eye can 't see it)
  // so this function here sets the userLogged on null and opens the modal and keep it open for a second then again it close it self
  //   setTimeout(() => setUserLogged(null), 1000);
  // }
  //so this function it's an helping eventListener where I remove the token then trigger onClose - that means to close the modal there where was triggered
  const closeModalAndLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* <input
        type="text"
        onClick={onOpen}
        id="icon"
        placeholder="Logout"
      ></input>
      <label htmlFor="icon">{logOutIcon}</label> */}

      {/* <button className="flex rounded-xl h-9 hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"> */}
      <div onClick={onOpen} className="text-xl hover:text-red-700">
        {logOutIcon}
      </div>
      <div onClick={onOpen} className="text-xl hover:text-red-700">
        Logout
      </div>
      {/* </button> */}

      <Modal onClose={closeModalAndLogout} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logged Out!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>You Logged Out! See you next time</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModalAndLogout}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default VerticallyCenter;
