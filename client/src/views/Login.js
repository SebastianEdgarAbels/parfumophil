import React, { useContext, useEffect, useRef } from "react";

import { AuthContext } from "../context/authContext";

function Login() {
  const { login, errors } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();

  return (
    <div className="flex flex-col justify-center items-center mt-32 mx-auto   rounded-xl border-solid border-orange-500 border-2 w-[400px] h-[400px]">
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          // value={userLogin.email ? userLogin.email : ""}
          name="email"
          placeholder="Email"
          ref={email}
          className="rounded ml-11"
          // onChange={handleChangeHandler}
        />
        {errors &&
          errors.map((error, i) => {
            if (error.msg === "wrong email, do you have an account?") {
              return (
                <p key={i} className="font-extrabold text-red-600 pl-[8px]">
                  {error.msg}
                </p>
              );
            }
          })}
      </div>
      <div className="mt-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          // value={userLogin.password ? userLogin.password : ""}
          name="password"
          placeholder="Password"
          ref={password}
          // onChange={handleChangeHandler}
          className="rounded ml-4"
        />
        {errors &&
          errors.map((error, i) => {
            if (error.msg === "incorrect password") {
              return (
                <p key={i} className="font-extrabold text-red-600 pl-[100px]">
                  {error.msg}
                </p>
              );
            }
          })}
      </div>
      <button
        onClick={() => login(email.current.value, password.current.value)}
        className=" mt-6 rounded text-lg font-semibold  text-emerald-900 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
