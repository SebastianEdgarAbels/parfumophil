import React from "react";
import Carusel from "../components/Carusel.js";

function Home() {
  // here i will put the things about this page etc
  return (
    <div className="flex justify-center">
      <div className="grid w-[1060px] grid-cols-1 grid-rows-3 justify-center">
        <div className="row-start-2 row-end-3">
          <Carusel />
        </div>
      </div>
    </div>
  );
}

export default Home;
