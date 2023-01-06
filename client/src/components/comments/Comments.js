import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext.js";
import { Box, Popper } from "@mui/material";
import { useParams } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

function Comments() {
  const { userLogged } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  // const [openPopup, setOpenPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const token = localStorage.getItem("token");

  const open = Boolean(anchorEl);
  const idPoper = open ? "simple-popper" : undefined;

  const { id } = useParams();
  // console.log("id from useParams :>> ", id);

  const handleMsg = (e) => {
    // console.log('e sa vedem ce are', e)
  //   console.log('e.target.value :>> ', e.target.value);
   
  //  console.log('e.target.value :>> ', e.target.value); 
  //  if (e.key === "Enter") {
  //     handleSubmitMsg()
  //   }
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
      urlencoded.append("postId", id); // take the post id and append it here

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
      // setOpenPopup(true);
      setAnchorEl(anchorEl ? null : event.currentTarget);
    }
    setMessage("");
  };

  const getPostById = async () => {
    const requestOptions = {
      method: "GET",

      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/philogram/${id}`,
        requestOptions
      );
      const result = await response.json();
      // console.log("result with 1 post by id", result);
      setComments(result.comments);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getPostById()
  }, [comments]);

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

  const handleDeleteComment = async (e) => {
    // console.log('handerDelete :>> ', e.target.parentElement.id);
    const myHeaders = new Headers();
   
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("commentId", e.target.parentElement.id);

    const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

    try {
      const response = await fetch("http://localhost:5000/api/philogram/63adc13c29dcc67d3a3be473/comment", requestOptions)
      const result = await response.json()
      console.log('result :>> ', result);
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      <div>
        <div className="flex items-center pr-3 pb-2">
          <textarea
            type="text"
            name="comment"
            value={message}
            onChange={handleMsg}
            placeholder="Say something"
            className="lg:w-[26rem] rounded"
          />
          <button>{sendElement}</button>
        </div>

        <Popper id={idPoper} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
            You have to login or to register so that you can comment.
          </Box>
        </Popper>

        {comments !== null &&
          comments.map((comment, i) => {
            return (
              <div className="flex flex-col justify-center  ">
                <div key={i}>
                  <div className="flex">
                    <img
                      src={comment.author.avatarPic}
                      alt="user avatar Pic"
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                      }}
                    />
                    <p className="font-bold pl-1">{comment.author.userName}</p>
                    <p className="pl-3">{comment.text}</p>
                    <div>
                    
                      <MdDeleteForever onClick={handleDeleteComment} id={comment._id} />
                    </div>
                  </div>
                  <p></p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Comments;
