import React from "react";
import Carusel from "../components/Carusel.js";

function Home() {
  // here i will put the things about this page etc
  return (
    <div className="wrapper w-[1060px] ">
      <div className="main-content">
        <p>this is Home</p>

        <div>
          <Carusel />
        </div>
        <div className="flex border solid-2 w- h-6"></div>
      </div>
    </div>
  );
}

export default Home;
