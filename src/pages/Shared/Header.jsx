import React from "react";
import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        console.log("logout successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Navlinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="addrider">Be A Rider</NavLink>
      </li>
      <li>
        <NavLink to="sendparcel">Send Parcel</NavLink>
      </li>
      {user && <></>}
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {Navlinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Navlinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <a
                href="/login"
                className="btn btn-error text-white"
                onClick={handleLogout}
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <div className="flex gap-2">
                <NavLink className="btn" to="/login">
                  Login
                </NavLink>
                <NavLink className="btn btn-success text-white" to="/register">
                  Register
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
