import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faVideo } from "@fortawesome/free-solid-svg-icons";

function UploadingGramModal() {
  const imgIcon = <FontAwesomeIcon icon={faCamera} />;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const picIcon = <FontAwesomeIcon icon={faCamera} />;
  const videoIcon = <FontAwesomeIcon icon={faVideo} />;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {imgIcon}
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create your post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3 flex"
              controlId="exampleForm.ControlInput1"
            >
              <div className="mr-3">
                <div>{picIcon}</div>
                <div>{videoIcon}</div>
              </div>
              <Form.Label></Form.Label>
              <Form.Control
                type="email"
                placeholder="Tag perfume in your photo or video"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Add some words to it</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="text-black"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            className="text-black"
            variant="primary"
            onClick={handleClose}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UploadingGramModal;
