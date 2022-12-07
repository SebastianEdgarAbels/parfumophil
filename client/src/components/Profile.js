import React from "react";
import { getProfile } from "../../../server/controller/usersController";

function Profile() {
  const getProfile = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Mzg4YTZhOTc3ZGNlNDVmMmFkZWM2NmIiLCJpYXQiOjE2NzAzMzU0NTYsImV4cCI6MTY3MDU5NDY1Nn0.jCm0-uVXJqlQvAMjn3kGfPwpuacOd_tUjgGsPvpmSJ0"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/users/profile", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <h2>User Profile</h2>
      <button onClick={getProfile}>Get My Profile</button>
    </div>
  );
}

export default Profile;
