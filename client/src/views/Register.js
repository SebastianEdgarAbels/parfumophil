import React, { useEffect, useRef, useState } from "react";
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
  const [errors, setErrors] = useState(null);
  // const [filteredErrors, setFilteredErrors] = useState(null);

  // attach the IMG
  const attachFileHandler = (e) => {
    console.log("first", e.target.files[0]);
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
      setErrors(result.errors);
      // console.log("result errors", result.errors);
      console.log("result", result);
      if (result.errors === null) {
        redirectTo("/login");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {}, [errors]);

  return (
    <div className="flex flex-col justify-center items-center mt-32 mx-auto   rounded-xl border-solid border-orange-500 border-2 w-[400px] min-h-[400px] max-h-[fit]">
      <div className="flex flex-col justify-center items-center">
        <form action="">
          <div className=" flex flex-col justify-center items-center">
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
                className=" m-3 rounded"
              />
              {errors &&
                errors.map((error, i) => {
                  if (error.msg === "Username is required") {
                    return (
                      <p
                        key={i}
                        className="font-extrabold text-red-600 pl-[118px]"
                      >
                        {error.msg}
                      </p>
                    );
                  }
                })}
            </div>
            <div>
              <label htmlFor="email" className=" m-3 pr-7">
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
                className=" m-3 rounded"
              />
              {errors &&
                errors.map((error, i) => {
                  if (error.msg === "Email is required") {
                    return (
                      <p
                        key={i}
                        className="font-extrabold text-red-600 pl-[118px]"
                      >
                        {error.msg}
                      </p>
                    );
                  } else if (error.msg === "Invalid email format") {
                    return (
                      <p
                        key={i}
                        className="font-extrabold text-red-600 pl-[118px]"
                      >
                        {error.msg}
                      </p>
                    );
                  }
                })}
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
                className="rounded text-sm font-semibold text-emerald-900 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
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
                className=" m-3 rounded"
              />
              {errors &&
                errors.map((error, i) => {
                  if (error.msg === "Invalid password") {
                    return (
                      <p
                        key={i}
                        className="font-extrabold text-red-600 pl-[118px]"
                      >
                        {error.msg}
                      </p>
                    );
                  }
                })}
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
      <button
        onClick={signup}
        className="mt-2 mb-3 rounded text-lg font-semibold text-emerald-900 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
      >
        Sign Up
      </button>
    </div>
  );
}

export default Register;
