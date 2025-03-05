import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";

const Main = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
