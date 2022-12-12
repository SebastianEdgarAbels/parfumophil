import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import {
  faPen,
  faTrash,
  faFileArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Profile() {
  const redirectTo = useNavigate();
  const { userLogged, setUserLogged, setDeletedUser } = useContext(AuthContext);
  const [newUserName, setNewUserName] = useState();
  const token = localStorage.getItem("token");
  const [isPTag, setPTag] = useState(true);

  // console.log("userLogged", userLogged);

  const editIcon = <FontAwesomeIcon icon={faPen} />;
  const deleteIcon = <FontAwesomeIcon icon={faTrash} />;
  const uploadIcon = <FontAwesomeIcon icon={faFileArrowUp} />;

  const handlerEditImg = () => {
    console.log("editImg :>> ", userLogged._id);
    console.log("token", token);
  };

  // ########################### HANDLER UPDATE USERNAME ########################### //

  const handleFormUserNameHandler = (e) => {
    e.preventDefault();
    console.log("e.target.name", e.target.name, e.target.value);
    setNewUserName(e.target.value);
  };

  const submitChange = async (e) => {
    e.preventDefault();
    console.log("newUserName :>> ", newUserName);
    // const token = localStorage.getItem("token");
    console.log("token", token);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("userName", newUserName);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/updateusername",
        requestOptions
      );
      const result = await response.json();
      console.log("result from the update userName", result);
    } catch (error) {
      console.log("error when updating the userName:>> ", error);
    }
  };

  // ########################### HANDLER DELETE IMG ########################### //
  const handlerDeleteImg = async () => {
    console.log("deleteImg", userLogged._id);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("id", userLogged._id);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        fetch("http://localhost:5000/api/users/deletepic", requestOptions)
      );
      const result = await response.json();
      console.log("result from the delete picture action", result);
    } catch (error) {}
  };

  // ########################### HANDLER DELETE ACC ########################### //
  // here i have a strange behavior in the redirected page DeletedUser when i refresh !!!!
  const handlerDeleteAcc = async () => {
    // when i delete the acc i have to append the logout function as well !!!!!!!!!!!!
    console.log("handlerDeleteAcc", userLogged.id);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("id", userLogged.id);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/deleteacc",
        requestOptions
      );
      const result = await response.json();
      console.log("result HandlerDelte :>> ", result);
      localStorage.removeItem("token");
      setUserLogged(false);
      setDeletedUser(true);
      redirectTo("/deleteduser");
    } catch (error) {
      console.log("error from handlerDeleteAcc", error);
    }
  };

  // #################################################################### //

  return (
    <div className="wrapper">
      <div className="container border-primary border-2 rounded-[10%] mt-10 ">
        <div>
          <h3 className="text-3xl font-bold italic underline mt-3 text-center">
            User Profile
          </h3>
        </div>
        <div className="flex flex-col justify-center items-center place-items-center">
          <div>
            <p className="font-bold">UserName:</p>
            {isPTag ? (
              <div className="flex gap-1">
                <p onClick={() => setPTag(false)}>{userLogged.userName}</p>
                <p onClick={() => setPTag(false)}>{editIcon}</p>
              </div>
            ) : (
              <div>
                <input
                  autoFocus
                  onClick={() => setPTag(true)}
                  type="text"
                  placeholder={userLogged.userName}
                  onChange={handleFormUserNameHandler}
                />
                <button onClick={(e) => submitChange(e)}>{uploadIcon}</button>
              </div>
            )}
          </div>
          <div>
            <p className="font-bold ">email</p>
            <p>{userLogged?.email}</p>
          </div>
          <div>
            <p className="font-bold">Avatar Picture </p>
            {isPTag ? ( <img
              src={userLogged?.avatarPic}
              alt="avatarPicture"
              className="rounded-[10%] w-[230px] h-[200px]"
            />) : (<input
                  autoFocus
                  onClick={() => setPTag(true)}
                  type="file"
                  placeholder={userLogged.userName}
                  onChange={handleFormUserNameHandler}
                />)
            <div className="flex justify-center gap-3">
              <p onClick={handlerEditImg}>{editIcon}</p>
              <p onClick={handlerDeleteImg}>{deleteIcon}</p>
            </div>
            
            <div className="flex gap-2 ">
              <p>Delete your Account? </p>
              <p onClick={handlerDeleteAcc}>{deleteIcon}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;