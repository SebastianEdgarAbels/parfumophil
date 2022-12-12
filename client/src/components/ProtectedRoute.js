import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function ProtectedRoute({ children }) {
  //   console.log("protected route props", children);

  const { userLogged, isLoading } = useContext(AuthContext);
  // console.log("userLogged :>> ", userLogged);
  // console.log("isLoading :>> ", isLoading);

  return (
    <div>
      {isLoading ? (
        <p>....Loading...</p>
      ) : userLogged ? (
        children
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}

export default ProtectedRoute;
