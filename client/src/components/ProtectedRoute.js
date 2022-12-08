import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function ProtectedRoute({ children }) {
  //   console.log("protected route props", children);

  const { userLogged } = useContext(AuthContext);
  console.log("userLogged :>> ", userLogged);
  return <div>{userLogged ? children : <Navigate to="/" />}</div>;
}

export default ProtectedRoute;
