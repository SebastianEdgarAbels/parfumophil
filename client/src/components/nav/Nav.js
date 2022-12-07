import React, { useContext } from "react";
// import "./Nav.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import VerticallyCenter from "./Modal";
import { AuthContext } from "../../context/authContext.js";

function Nav() {
  const { userLogged } = useContext(AuthContext);
  console.log("userLogged", userLogged);

  const regIcon = <FontAwesomeIcon icon={faUsers} />;
  const logInIcon = <FontAwesomeIcon icon={faRightToBracket} />;

  const token = localStorage.getItem("token");
  console.log("token :>> ", token);

  return (
    <div>
      {/* #### Here is the IMG and the TEXT ##### */}
      {/* ####################################### */}
      <div className="flex justify-center">
        <div className="flex justify-center items-baseline grow">
          <div>
            <img
              src="/nose.png"
              alt="nose in love"
              width={"65rem"}
              className="ml-[10rem] rounded-[15px]"
            />
          </div>
          <div>
            <p>For the love of scents</p>
          </div>
        </div>
        {/* #### Here is the REGISTER, LOGIN || USER.IMG && LOGOUT  ##### */}
        {/* ############################################################# */}
        <div className="flex gap-3">
          {token === null ? (
            <div className="flex">
              <div>{regIcon}</div>
              <Link to="register" className="ml-1">
                Register
              </Link>
            </div>
          ) : (
            <img
              src={userLogged.avatarPic}
              alt="user pic"
              style={{ height: "35px", width: " 35px", borderRadius: "50%" }}
            />
          )}
          {token === null ? (
            <div className="flex mr-2">
              <div>{logInIcon}</div>
              <Link to="login" className="ml-1">
                Log In
              </Link>
            </div>
          ) : (
            <div className="flex mr-2">
              <div>
                <VerticallyCenter />
              </div>
              Logout
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
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="Perfumes">
              <span>Perfumes</span>
            </Link>
          </li>
          <li>
            <Link to="ParfumoPhiloGram">
              <span>ParfumoPhiloGram</span>
            </Link>
          </li>
          <li>
            {/* <Link to="/About">
              <span>About</span>
            </Link> */}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
