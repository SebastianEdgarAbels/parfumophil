import React, { useState } from "react";

function Register() {
  const [selectedFile, setSelectedFile] = useState({});
  const [newUser, setNewUser] = useState({});

  const attachFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

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

  return (
    <div>
      <div className="">
        <form action="">
          <div className=" flex-col min-w-[960px] min-h-[500px items-center justify-around m-3 gap-5">
            <div>
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                value={newUser.userName ? newUser.userName : ""}
                name="userName"
                placeholder="Username"
                onChange={handleChangeHandler}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={newUser.email ? newUser.email : ""}
                name="email"
                placeholder="Email"
                onChange={handleChangeHandler}
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={newUser.password ? newUser.password : ""}
                name="password"
                placeholder="Password"
                onChange={handleChangeHandler}
              />
            </div>
          </div>
        </form>
        {newUser && <img src={newUser.avatarPicture} alt="user pic" />}
      </div>
    </div>
  );
}

export default Register;
