import "./App.css";

import Nav from "./components/nav/Nav.js";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home.js";
import Perfumes from "./views/Perfumes.js";
import ParfumoPhiloGram from "./views/ParfumoPhiloGram.js";
import Register from "./views/Register.js";
import Login from "./views/Login.js";
import getToken from "./utils/getToken.js";
import { useEffect } from "react";
import { AuthContextProvider } from "./context/authContext.js";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  // const getPerfumes = async () => {
  //   const response = await fetch("http://localhost:5000/api/perfumes/all");
  //   const results = await response.json();
  //   console.log("results", results);
  // };

  // useEffect(() => {
  //   getPerfumes();
  // }, []);

  // this comes from utils/getToken
  // useEffect(() => {
  //   getToken();
  // }, []);

  return (
    <>
      <AuthContextProvider>
        <ChakraProvider>
          <Nav />
        </ChakraProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="perfumes" element={<Perfumes />} />
          <Route path="parfumophilogram" element={<ParfumoPhiloGram />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* <Route path="/Home" element={<About />} /> */}
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
