import React from "react";
import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";
import FastMoverLogo from "../pages/Shared/FastMoverLogo/FastMoverLogo";

const AuthLayout = () => {
  return (
    <div className="w-7xl mx-auto pt-12 bg-base-200">
      <div className="-mb-20">
        <FastMoverLogo></FastMoverLogo>
      </div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={authImg} />
          <div>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
