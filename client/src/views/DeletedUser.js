import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

function DeletedUser() {
  const { deletedUser } = useContext(AuthContext);

  return (
    <div>
      <div className="flex justify-center mt-20 text-2xl font-semibold">
        {deletedUser && <p>Your account is successfully deleted!</p>}
        {!deletedUser && <p>you are not logged in , click here to go Home</p>}
      </div>
    </div>
  );
}

export default DeletedUser;
