// 1. Import hook
import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// 2. Create Context / Store
export const AuthContext = createContext();

// 3. Create provider
export const AuthContextProvider = (props) => {
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
      setUserLogged(result);
    } catch (error) {
      console.log(" error :>> ", error);
    }
  };

  useEffect(() => {
    profile();
  }, []);

  return (
    <AuthContext.Provider value={{ userLogged }}>
      {props.children}
    </AuthContext.Provider>
  );
};
