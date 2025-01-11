// MainLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-content">
        <Navbar />
        <div className="layout-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;