import React, { useState } from "react";

function Register() {
  // //############### useStates ###############//
  const [selectedFile, setSelectedFile] = useState({});
  const [newUser, setNewUser] = useState({});

  // eventListener
  const attachFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // eventListener
  const submitForm = async (e) => {
    console.log("selectedFile", selectedFile);
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
    setNewUser({ ...newUser, avatarPicture: result.image });
    console.log("result :>> ", result);
  };

  // eventListener
  const handleChangeHandler = (e) => {
    console.log(
      "e.target.name :>> ",
      e.target.name,
      e.target.value,
      e.target.email,
      e.target.value
    );
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
      [e.target.email]: e.target.value,
    });
  };

  const signup = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append("userName", newUser.userName);
    urlencoded.append(
      "avatarPic",
      newUser.avatarPic
        ? newUser.avatarPic
        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/api/users/signup",
      requestOptions
    );
    const result = await response.json();
    console.log("result", result);
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
                value={newUser.userName ? newUser.userName : ""}
                name="userName"
                placeholder="Username"
                onChange={handleChangeHandler}
                className=" m-3"
              />
            </div>
            <div>
              <label htmlFor="email" className=" m-3">
                Email
              </label>
              <input
                type="text"
                value={newUser.email ? newUser.email : ""}
                name="email"
                placeholder="Email"
                onChange={handleChangeHandler}
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
                value={newUser.password ? newUser.password : ""}
                name="password"
                placeholder="Password"
                onChange={handleChangeHandler}
                required
                className=" m-3"
              />
            </div>
          </div>
        </form>
        {console.log(newUser.avatarPic)}
        {newUser && newUser.avatarPic !== undefined ? (
          <img
            src={newUser.avatarPic}
            alt="user pic"
            style={{ width: "100px" }}
          />
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
