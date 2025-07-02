import React, { useState } from "react";
import Sidebar from "../pages/Backend/Sidebar";
import Navbar from "../pages/Backend/Navbar";
import { Outlet } from "react-router";



const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
    <div className="">
            <div className="flex h-screen max-w-7xl mx-auto bg-amber-50 border border-blue-950">
        <Sidebar isOpen={sidebarOpen} />
        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-4 flex-1 overflow-y-auto">
            <Outlet></Outlet>
          </main>
        </div>
      </div>
    </div>

    </>
  );
}



export default DashboardLayout;
