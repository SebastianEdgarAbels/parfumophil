import React from "react";
// import "./Nav.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const regIcon = <FontAwesomeIcon icon={faUsers} />;
  const logInIcon = <FontAwesomeIcon icon={faRightToBracket} />;

  return (
    <div>
      {/* #### Hier is the IMG and the TEXT ##### */}
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
        <dir className="flex gap-3">
          <div className="flex">
            <div>{regIcon}</div>
            <Link to="register" className="ml-1">
              Register
            </Link>
          </div>
          <div className="flex mr-2">
            <div>{logInIcon}</div>
            <Link to="login" className="ml-1">
              Log In
            </Link>
          </div>
        </dir>
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
