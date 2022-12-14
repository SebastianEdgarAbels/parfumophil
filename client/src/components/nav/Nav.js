import React, { useContext } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import VerticallyCenter from "./Modal";
import { AuthContext } from "../../context/authContext.js";

function Nav() {
  const { userLogged } = useContext(AuthContext);

  // console.log("%cuserLogged in nav", "color:red", userLogged);

  const regIcon = <FontAwesomeIcon icon={faUsers} />;
  const logInIcon = <FontAwesomeIcon icon={faRightToBracket} />;

  return (
    <div>
      {/* #### Here is the IMG and the TEXT ##### */}
      {/* ####################################### */}
      <div className="flex justify-between md:justify-center lg:justify-center">
        <div className="flex justify-evenly md:justify-center items-baseline lg:grow">
          {/* <div > */}
          <img
            src="/nose.png"
            alt="nose in love"
            className="md:ml-[10rem] lg:ml-[10rem] rounded-[15px] w-16 "
          />
          {/* </div> */}
          {/* <div> */}
          <p className="text-xs  md:text-2xl lg:text-2xl ">
            For the love of scents
          </p>
          {/* </div> */}
        </div>
        {/* #### Here is the REGISTER, LOGIN || USER.IMG && LOGOUT  ##### */}
        {/* ############################################################# */}
        <div className="flex gap-3 ">
          {!userLogged ? (
            <div>
              <Link to="register" className="flex ml-1 ">
                <div className="text-xl">{regIcon}</div>
                <div className="ml-1 text-xl">Register</div>
              </Link>
            </div>
          ) : (
            <Link to="/profile">
              <div className=" mt-1 hover:rounded md:hover:bg-orange-500 md:hover:h-[31px] md:hover:w-[31px]">
                <img
                  src={userLogged?.avatarPic}
                  alt="user pic"
                  style={{
                    height: "29px",
                    width: " 29px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </Link>
          )}
          {!userLogged ? (
            <div>
              <Link to="login" className="ml-1 flex mr-2">
                <div className="text-xl">{logInIcon}</div>
                <div className="ml-1 text-xl">Log In</div>
              </Link>
            </div>
          ) : (
            <div className="flex mr-2">
              <VerticallyCenter />
            </div>
          )}
        </div>
      </div>
      {/* #### Hier is the NAV ##### */}
      {/* ########################## */}
      <nav className="flex justify-center border-t-2 border-b-2">
        <ul className="flex space-x-6">
          <li>
            <Link to="/">
              <span className="barBtns">Home</span>
            </Link>
          </li>
          <li>
            <Link to="Perfumes">
              <span className="barBtns">Perfumes</span>
            </Link>
          </li>
          <li>
            <Link to="ParfumoPhiloGram">
              <span className="barBtns">ParfumoPhiloGram</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
