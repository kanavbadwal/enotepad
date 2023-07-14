import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);
  const onClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <u>eNotepad</u>
        </Link>
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
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>

          {
            !localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link
                  className="btn btn-warning mx-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-warning mx-2"
                  to="/signup"
                  role="button"
                >
                  Sign up
                </Link>
              </form>
            ) : (
              <form className="d-flex" role="search">
                <button
                  className="btn btn-warning mx-1"
                  onClick={onClick}
                  role="button"
                >
                  Log out
                </button>
              </form>
            )
            // eslint-disable-next-line
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
