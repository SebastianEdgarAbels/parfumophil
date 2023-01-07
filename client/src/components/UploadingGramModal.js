import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faVideo } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/authContext.js";
import { Box, Popper } from "@mui/material";


function UploadingGramModal() {
  
  const userLogged = useContext(AuthContext)

  const imgIcon = <FontAwesomeIcon icon={faCamera} />;
  const [show, setShow] = useState(false);
  // const [selectedPics, setSelectedPics] = useState([]);
  const [pics, setPics] = useState([]);
  // const [selectedVideo, setSelectedVideo] = useState("");
  const [video, setVideo] = useState([]);
  const [perfumeTag, setperfumeTag] = useState("");
  const [comment, setComment] = useState("");
  
  const token = localStorage.getItem("token");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const idPopper = open ? "simple-popper" : undefined;


  const handleShow = () => {
    setShow(true);
  }

  const popUp = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);

  }

  const picIcon = <FontAwesomeIcon icon={faCamera} />;
  const videoIcon = <FontAwesomeIcon icon={faVideo} />;

  // handler to attach the pics
  const attachPicsHandler = (e) => {
    e.preventDefault();

    // because it needs time upload the pics and doesn't wait till then and
    // just trigger the next function, this creates an error because it triggers the submit function without having the pics
    // setSelectedPics(e.target.files);
    submitPics(e.target.files);
  };
 

  // the handler for uploading the pics
  const submitPics = async (imgs) => {
    // e.preventDefault();

    // this is for saving it in the cloudinary
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();

    if (imgs !== null) {
      for (let pic of imgs) {
        console.log("pic", pic);
        formdata.append("image", pic);
      }
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/philogram/uploadImageGram",
        requestOptions
      );
      const results = await response.json();
      console.log(" results", results);
      const result = results.images;
      // for (let i = 0; i < result.images.lenght; i++) {
      //   setPics.push(...pics, {
      //     url: result.images[i].image,
      //     id: result.images[i].ImgPublic_id,
      //   });
      // }
      const picObj = [];
      for (let res of result) {
        console.log("res", res);
        picObj.push({
          public_id: res.ImgPublic_id,
          url: res.image,
        });
      }
      console.log("picObj", picObj);
      setPics(picObj);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  // console.log("pics >>>>>>>>>>>:>> ", pics);

  const attachVideoHandler = (e) => {
    e.preventDefault();

    // console.log("e.target.files :>> ", e.target.files[0]);
    // because it needs time upload the video and doesn't wait till then and
    // just trigger the next function creates an error because like i said triggers the submit function without having the videos
    // setSelectedVideo(e.target.files[0]);
    submitVideo(e.target.files[0]);
  };
  // console.log("selectedVideo", selectedVideo);

  const submitVideo = async (video) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append("video", video);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/philogram/uploadvideo",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setVideo({ public_id: result.videoPublic_id, url: result.video });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handlerPerfumeTag = (e) => {
    // console.log("e.target.value handlerPerfumeTag :>> ", e.target.value);
    setperfumeTag(e.target.value);
  };

  const handlerCommArea = (e) => {
    // console.log("e.target.value handlerCommArea", e.target.value);
    setComment(e.target.value);
  };

  const handleClose = async () => {
    setShow(false);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    console.log(" pics from UGM line 136 :>> ", pics);
    const raw = JSON.stringify({
      pics: pics,
      video: video,
      perfumeTag: perfumeTag,
      text: comment,
      comments: [],
      date: new Date(),
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/philogram/uploadPost",
        requestOptions
      );
      const result = await response.json();
      console.log("result :>> ", result);
    } catch (error) {
      console.log("error when uploading the whole new post FE", error);
    }
  };

  return (
    <>
      <Popper id={idPopper} open={open} anchorEl={anchorEl} className="flex flex-col items-center">
        
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper", borderRadius:"50%"}}>
            You have to login or to register so that you can comment.
          </Box>
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper", borderRadius:"50%", width:"30px", height:"25px", marginTop:"5px"}}>
          </Box>
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper", borderRadius:"50%", width:"20px", marginBottom:"4px", marginTop:"4px"}}>
          </Box>
         
        </Popper>

       <Button variant="primary" onClick={token ? handleShow : popUp }  >
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
                  <label htmlFor="multiplePicUpload">
                    <i className="fa-solid fa-camera">{picIcon}</i>
                  </label>

                  <input
                    type="file"
                    name="pic"
                    id="multiplePicUpload"
                    style={{ display: "none" }}
                    multiple
                    onChange={attachPicsHandler}
                  />
                  <button
                    onClick={submitPics}
                    className="display:none"
                  ></button>
                </div>

                <div>
                  {/* how to make it work */}
                  <label htmlFor="videoUpload">
                    <i className="fa-solid fa-video">{videoIcon}</i>
                  </label>
                </div>
                <div>
                  <input
                    type="file"
                    name="video"
                    id="videoUpload"
                    style={{ display: "none" }}
                    onChange={attachVideoHandler}
                  />
                  <button
                    onClick={submitVideo}
                    className="display:none"
                  ></button>
                </div>
              </div>
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
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
            onClick={() => setShow(false)}
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
