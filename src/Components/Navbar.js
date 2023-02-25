import React from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Addfriend from "./Addfriend";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Logout?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        navigate("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("logged_in_id");
        localStorage.removeItem("username");
        
      }
    });
  };
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {localStorage.getItem("username") ? (
            <Link className="navbar-brand" to="/">
              {localStorage.getItem("username")}
            </Link>
          ) : (
            <Link className="navbar-brand" to="/login">
              Welcome
            </Link>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {localStorage.getItem("logged_in_id") && (
                  <Link className="nav-link" aria-current="page" to="/">
                    Chats
                  </Link>
                )}
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <>
                <Link
                  className="btn btn-outline-primary"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-outline-primary  mx-2"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Addfriend />
                <button
                  className="btn btn-danger mx-2 my-2"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
