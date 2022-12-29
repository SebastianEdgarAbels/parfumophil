import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.js";
import { Box, Popper } from "@mui/material";

function Comments() {
  const { userLogged } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const token = localStorage.getItem("token");

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleMsg = (e) => {
    // console.log("e.target.value :>> ", e.target.value);
    setMessage(e.target.value);
  };

  // const msgDate = (date) => {
  //   return new Date(date * 1000).toLocaleString();
  // };

  const handleSubmitMsg = async (event) => {
    // console.log("submit message");
    if (userLogged) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("text", message);
      // urlencoded.append("author", "username");
      urlencoded.append("date", new Date());
      urlencoded.append("postId"); // take the post id and append it here

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:5000/api/philogram/createComment",
          requestOptions
        );
        const result = await response.json();
        console.log("result in handlerSubmitMsg dot 0", result.commentPost);
        // console.log("result in handlerSubmitMsg", typeof result.commentPost);
      } catch (error) {
        console.log(" error", error);
      }
    } else {
      setOpenPopup(true);
      setAnchorEl(anchorEl ? null : event.currentTarget);
    }
    setMessage("");
  };

  const sendElement = (
    <FontAwesomeIcon
      icon={faPaperPlane}
      size={"xl"}
      style={{ color: "#009688", paddingLeft: "5px" }}
      onClick={handleSubmitMsg}
    />
  );

  // console.log("comments :>> ", comments);
  // console.log("the type of the comments", typeof comments);

  return (
    <>
      <div>
        <textarea
          type="text"
          name="comment"
          value={message}
          onChange={handleMsg}
          placeholder="Say something"
        />
        <button>{sendElement}</button>
      </div>
      <div>
        <Popper id={id} open={openPopup} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
            You have to login or to register so that you can comment.
          </Box>
        </Popper>
      </div>

      {comments &&
        comments.map((comment, i) => {
          return (
            <div>
              <div key={i}>
                <p>{comment[0]}</p>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Comments;
