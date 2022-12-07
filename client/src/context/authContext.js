// 1. Import hook
import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// 2. Create Context / Store
export const AuthContext = createContext();

// 3. Create provider
export const AuthContextProvider = (props) => {
  console.log("authcontext run");
  const [userLogged, setUserLogged] = useState();

  const profile = async () => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
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
      console.log("result :>> ", result);
      setUserLogged(result.user);

      console.log("userLogged", userLogged);
    } catch (error) {
      console.log(" error :>> ", error);
    }
  };
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
      console.log("result:>>>>", result);

      const { token } = result;

      if (token) {
        localStorage.setItem("token", token);
        setUserLogged(result.user);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUserLogged(false);
  };
  useEffect(() => {
    console.log("useEffect auth>>>");
    profile();
  }, []);

  return (
    <AuthContext.Provider value={{ userLogged, setUserLogged, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
