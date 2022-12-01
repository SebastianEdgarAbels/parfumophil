import "./App.css";

import Nav from "./components/nav/Nav.js";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home.js";
import Perfumes from "./views/Perfumes.js";
import ParfumoPhiloGram from "./views/ParfumoPhiloGram.js";
import Register from "./views/Register.js";

function App() {
  // const getPerfumes = async () => {
  //   const response = await fetch("http://localhost:5000/api/perfumes/all");
  //   const results = await response.json();
  //   console.log("results", results);
  // };

  // useEffect(() => {
  //   getPerfumes();
  // }, []);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="perfumes" element={<Perfumes />} />
        <Route path="parfumophilogram" element={<ParfumoPhiloGram />} />
        <Route path="register" element={<Register />} />

        {/* <Route path="/Home" element={<About />} /> */}
      </Routes>
    </>
  );
}

export default App;
