import "./App.css";

import Nav from "./components/nav/Nav.js";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home.js";
import Perfumes from "./views/Perfumes.js";
import ParfumoPhiloGram from "./views/ParfumoPhiloGram.js";
import Register from "./views/Register.js";
import Login from "./views/Login.js";

import { AuthContextProvider } from "./context/authContext.js";
import { ChakraProvider } from "@chakra-ui/react";
import { PerfumesContextProvider } from "./context/perfumesContext";
import Profile from "./views/Profile.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import DeletedUser from "./views/DeletedUser.js";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <AuthContextProvider>
        <PerfumesContextProvider>
          <ChakraProvider>
            <Nav />
          </ChakraProvider>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="perfumes" element={<Perfumes />} />
            <Route path="parfumophilogram" element={<ParfumoPhiloGram />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/deleteduser" element={<DeletedUser />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* <Route path="/Home" element={<About />} /> */}
          </Routes>
        </PerfumesContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
