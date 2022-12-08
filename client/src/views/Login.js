import React, { useContext, useRef } from "react";

import { AuthContext } from "../context/authContext";

function Login() {
  // const [userLogin, setUserLogin] = useState({});
  const { login } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();

  // const handleChangeHandler = (e) => {
  //   setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  // };

  // const login = async () => {
  //   // console.log("userLogin :>> ", userLogin);

  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //   const urlencoded = new URLSearchParams();
  //   urlencoded.append("email", userLogin.email);
  //   urlencoded.append("password", userLogin.password);

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: urlencoded,
  //     redirect: "follow",
  //   };

  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/api/users/login",
  //       requestOptions
  //     );
  //     const result = await response.json();
  //     console.log("result:>>>>", result);

  //     const { token } = result;

  //     if (token) {
  //       localStorage.setItem("token", token);
  //       setUserLogged(result);
  //     }
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }
  // };

  return (
    <div>
      <div className="">
        <div className=" flex-col min-w-[960px] min-h-[500px items-center justify-around m-3 gap-5">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              // value={userLogin.email ? userLogin.email : ""}
              name="email"
              placeholder="Email"
              ref={email}
              // onChange={handleChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              // value={userLogin.password ? userLogin.password : ""}
              name="password"
              placeholder="Password"
              ref={password}
              // onChange={handleChangeHandler}
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => login(email.current.value, password.current.value)}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
