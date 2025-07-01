import React, { useState } from "react";
import Body from "../pages/Backend/Body";
import Sidebar from "../pages/Backend/Sidebar";
import Navbar from "../pages/Backend/Navbar";



const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <div className="flex h-screen max-w-6xl mx-auto">
        <Sidebar isOpen={sidebarOpen} />
        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-4 flex-1 overflow-y-auto">
            <Body></Body>
          </main>
        </div>
      </div>
    </>
  );
}



export default DashboardLayout;
