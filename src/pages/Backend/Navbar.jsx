import React from "react";
import { Menu } from "lucide-react";


const Navbar = ({ toggleSidebar }) => {
    // const { user } = useAuth();
    // console.log(user);
    
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
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 rounded-box w-52">
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
