import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faVideo } from "@fortawesome/free-solid-svg-icons";

function UploadingGramModal() {
  const imgIcon = <FontAwesomeIcon icon={faCamera} />;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false); // here i have to send the data to backend!!!!! this is the eventHandler for save
  const handleShow = () => setShow(true);

  const picIcon = <FontAwesomeIcon icon={faCamera} />;
  const videoIcon = <FontAwesomeIcon icon={faVideo} />;

  const handlerPerfumeTag = (e) => {
    console.log("e.target.value handlerPerfumeTag :>> ", e.target.value);
  };

  const handlerCommArea = (e) => {
    console.log("e.target.value handlerCommArea", e.target.value);
  };

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
                <div>
                  {/* how to make it work */}
                  <label for="multiplePicUpload">
                    <i className="fa-solid fa-camera">{picIcon}</i>
                  </label>

                  <input
                    type="file"
                    name="pic"
                    id="multiplePicUpload"
                    style={{ display: "none" }}
                    multiple
                  />
                </div>
                <div></div>
                <div>
                  {/* how to make it work */}

                  <i className="fa-solid fa-video">{videoIcon}</i>
                </div>
                <div>
                  <input
                    type="file"
                    name="video"
                    id="video"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <Form.Label></Form.Label>
              <Form.Control
                type="email"
                placeholder="Tag perfume in your photo or video"
                autoFocus
                onChange={handlerPerfumeTag}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Add some words to it</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={handlerCommArea} />
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
