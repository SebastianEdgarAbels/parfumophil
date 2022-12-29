import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer.js";
import { AuthContext } from "../context/authContext.js";

function ParfumoPhiloGram() {
  // here will be uploaded the picture from users and after clicking 1 will be redirected to another page where will be the
  // pic and comments site
  const { user } = useContext(AuthContext);
  console.log("user :>> ", user);

  return (
    <>
      {/* <div className="grid lg:grid-cols-3 sm:grid-cols-2  mt-8 gap-6 w-960 border-solid border-2 border-gray-500 min-h-screen  ">
        {perfumes &&
          perfumes.map((perfume) => {
            return (
              <div className="bg-grey rounded shadow-md  ">
                <p>U_pic, U_Name</p>
                <Link to="/perfumophilogramview/${post.id}">
                  <img
                    src={perfume.img}
                    alt={perfume.name}
                    className=" h-32 sm:h-48"
                  />
                </Link>
                <div className="flex justify-between">
                  <div>
                    <button>like</button>
                    <button>comments</button>
                    <button>how many emojis?</button>
                  </div>
                  <div>perfume img</div>
                </div>
              </div>
            );
          })}
      </div> */}
      <Footer />
    </>
  );
}

export default ParfumoPhiloGram;
