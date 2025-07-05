import React from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  FileText,
  Tag,
  Truck,
  ShoppingBag,
  Percent,
  Users,
  File,
  PackageCheck,
  Boxes,
} from "lucide-react";

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`bg-[#ddd]  h-full p-4 transition-all duration-300 ${isOpen ? "w-64" : "w-20"} overflow-hidden`}>
      <div className="space-y-2">
        <NavLink to="/dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <LayoutDashboard className="w-5 h-5" />
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        {/* <NavLink to="/categories" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <FileText className="w-5 h-5" />
          {isOpen && <span>Category</span>}
        </NavLink>

        <NavLink to="/subcategory" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <Boxes className="w-5 h-5" />
          {isOpen && <span>Sub Category</span>}
        </NavLink>

        <NavLink to="/brands" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <PackageCheck className="w-5 h-5" />
          {isOpen && <span>Brands</span>}
        </NavLink>

        <NavLink to="/products" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <Tag className="w-5 h-5" />
          {isOpen && <span>Products</span>}
        </NavLink> */}

        <NavLink to="/shipping" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <Truck className="w-5 h-5" />
          {isOpen && <span>Shipping</span>}
        </NavLink>

        <NavLink to="/dashboard/myparcels" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <ShoppingBag className="w-5 h-5" />
          {isOpen && <span>My Parcels</span>}
        </NavLink>
        <NavLink to="/dashboard/payment_histroy" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <Percent className="w-5 h-5" />
          {isOpen && <span>Payment Histroy</span>}
        </NavLink>

        {/* 

        <NavLink to="/users" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <Users className="w-5 h-5" />
          {isOpen && <span>Users</span>}
        </NavLink>

        <NavLink to="/pages" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <File className="w-5 h-5" />
          {isOpen && <span>Pages</span>}
        </NavLink> */}
      </div>
    </aside>
  );
};

export default Sidebar;
