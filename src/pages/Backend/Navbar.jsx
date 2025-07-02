import React from "react";
import { Menu } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ toggleSidebar }) => {
  const { user, logOutUser } = useAuth();
  console.log(user);

  const handleLogout = () => {
    logOutUser()
      .then(() => console.log("User signed out"))
      .catch((error) => console.error("Sign out error", error));
  };

  return (
    <div className="navbar bg-black border-b justify-between px-4 text-white">
      <button onClick={toggleSidebar} className="btn btn-ghost">
        <Menu />
      </button>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="/img/avatar5.png" alt="Avatar" />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 text-black rounded-box w-52"
        >
          <li>
            <a>Settings</a>
          </li>
          <li>
            {" "}
            <a href="/login" className="" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
