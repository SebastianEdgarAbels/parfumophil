import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const redirectTo = useNavigate();

  // //############### useStates ###############//
  const [selectedFile, setSelectedFile] = useState({});
  // const [newUser, setNewUser] = useState({});
  const [avatarPicture, setAvatarPicture] = useState("");
  const [imgCloudinaryID, setImgCloudinaryID] = useState("");
  const email = useRef();
  const password = useRef();
  const userName = useRef();

  // attach the IMG
  const attachFileHandler = (e) => {
    // console.log("first", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  // submit the IMG
  const submitForm = async (e) => {
    // console.log("selectedFile", selectedFile);
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/api/users/uploadimage",
      requestOptions
    );
    const result = await response.json();
    setAvatarPicture(result.image);
    setImgCloudinaryID(result.ImgPublic_id);
    console.log("result with the id :>> ", result.ImgPublic_id);
  };
  // console.log("avatarPictures :>> ", avatarPicture);
  // console.log("imgCloudinaryID :>> ", imgCloudinaryID);

  // eventListener
  // const handleChangeHandler = (e) => {
  //   // console.log(
  //   //   "e.target.name :>> ",
  //   //   e.target.name,
  //   //   e.target.value,
  //   //   e.target.email,
  //   //   e.target.value
  //   // );
  //   // setNewUser({
  //   //   ...newUser,
  //   //   [e.target.name]: e.target.value,
  //   //   [e.target.email]: e.target.value,
  //   // });
  // };

  const signup = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email.current.value);
    urlencoded.append("password", password.current.value);
    urlencoded.append("userName", userName.current.value);
    urlencoded.append(
      "avatarPic",
      avatarPicture
        ? avatarPicture
        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    );
    urlencoded.append("ImgPublic_id", imgCloudinaryID ? imgCloudinaryID : "");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/signup",
        requestOptions
      );
      const result = await response.json();
      // console.log("result", result);
      redirectTo("/login");
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <div className="">
        <form action="">
          <div className=" flex-col min-w-[960px] min-h-[500px items-center justify-around m-3 gap-5">
            <div className=" m-3">
              <label htmlFor="userName" className=" m-3">
                Username
              </label>
              <input
                type="text"
                // value={newUser.userName ? newUser.userName : ""}
                name="userName"
                ref={userName}
                placeholder="Username"
                // onChange={handleChanandler}
                className=" m-3"
              />
            </div>
            <div>
              <label htmlFor="email" className=" m-3">
                Email
              </label>
              <input
                type="text"
                // value={newUser.email ? newUser.email : ""}
                name="email"
                placeholder="Email"
                ref={email}
                // onChange={handleChangeHandler}
                required
                className=" m-3"
              />
            </div>
            <div>
              <input
                type="file"
                name="file"
                id="file"
                onChange={attachFileHandler}
              />
              <button
                onClick={submitForm}
                className="border-solid border-2 border-yellow-500 rounded-md"
              >
                Upload
              </button>
            </div>
            <div>
              <label htmlFor="password" className=" m-3">
                Password
              </label>
              <input
                type="password"
                // value={newUser.password ? newUser.password : ""}
                name="password"
                placeholder="Password"
                ref={password}
                // onChange={handleChangeHandler}
                required
                className=" m-3"
              />
            </div>
          </div>
        </form>
        {/* {console.log(newUser.avatarPic)} */}
        {avatarPicture ? (
          <img src={avatarPicture} alt="user pic" style={{ width: "100px" }} />
        ) : (
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            alt="default user pic"
            style={{ width: "35px", borderRadius: "50%" }}
          />
        )}
      </div>
      <button onClick={signup}>Sign Up</button>
    </div>
  );
}

export default Register;
