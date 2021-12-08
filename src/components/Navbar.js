import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function Navbar({ token, setToken }) {
  const history = useHistory();

  return (
    <div className="nav">
      {token ? (
        <ul>
          <li>
            <Link className="link" to="/Product">
              Product
            </Link>
          </li>

          <li>
            <Link className="link" to="/Favirote">
              Favirote
            </Link>
          </li>
          <li>
            <Link className="link" to="/Product">
              Coffe
            </Link>
          </li>
          <li>
            <Link
              className="link"
              to="/login"
              onClick={() => {
                setToken("");
              }}
            >
              log out
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link className="link" to="/login">
              login
            </Link>
          </li>
          <li>
            <Link className="link" to="/signUp">
              signUp
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
