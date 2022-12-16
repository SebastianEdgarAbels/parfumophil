// bara in care am 3 elemente stanga sa merg home, mid camera pt a introduce threaduri noi so dreapta sa mearga top
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import UploadingGramModal from "../UploadingGramModal";

const goBackIcon = <FontAwesomeIcon icon={faArrowLeft} />;
const goTopIcon = <FontAwesomeIcon icon={faArrowUp} />;

function Footer() {
  return (
    <footer className="bg-gray-400 text-center bg-[rgba(255, 156, 0, 0.2)] mt-auto">
      <div className="flex justify-between ">
        <div>
          <Button>{goBackIcon}</Button>
        </div>

        <UploadingGramModal />

        <div>
          <Button>{goTopIcon}</Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
