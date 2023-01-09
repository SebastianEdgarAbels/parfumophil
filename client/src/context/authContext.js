// 1. Import hook
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// 2. Create Context / Store
export const AuthContext = createContext();

// 3. Create provider
export const AuthContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const redirectTo = useNavigate();
  // console.log("authcontext run");
  const [userLogged, setUserLogged] = useState(null);
  const [deletedUser, setDeletedUser] = useState(false);
  const [errors, setErrors] = useState(null);

  // #################### PROFILE #################### //
  // ############################################### //
  const profile = async () => {
    const token = localStorage.getItem("token");
    // console.log("%ctoken authcontext profile", "color:green", token);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        requestOptions
      );
      const result = await response.json();
      // console.log("result from authContext :>> ", result);
      if (token) {
        setUserLogged(result);
      }

      setIsLoading(false);
      // console.log("userLogged", userLogged);
    } catch (error) {
      setIsLoading(false);
      console.log(" error :>> ", error);
    }
  };

  // #################### LOGIN #################### //
  // ############################################### //
  const login = async (email, password) => {
    // console.log("userLogin :>> ", userLogin);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        requestOptions
      );
      const result = await response.json();
      console.log("result from the login in the authcontext :>>>>", result);
      console.log(
        "result from the login in the authcontext :>>>>",
        result.errors
      );
      if (result.errors) {
        setErrors(result.errors);
      }

      const { token } = result;
      if (token) {
        localStorage.setItem("token", token);
        setErrors(null);
        setUserLogged(result.user);
        redirectTo("/");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {}, [errors]);

  // ############################################### //

  // #################### LOGOUT #################### //
  // ############################################### //
  const logout = () => {
    localStorage.removeItem("token");
    setUserLogged(null);
  };
  // ############################################### //

  useEffect(() => {
    console.log("useEffect auth>>>");
    profile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userLogged,
        setUserLogged,
        login,
        logout,
        isLoading,
        deletedUser,
        setDeletedUser,
        errors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
