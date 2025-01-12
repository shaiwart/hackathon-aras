import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./MainLayout.css";
import Chatbot from "../Chatbot/Chatbot";

const MainLayout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="content-main">
          <Outlet />
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

export default MainLayout;
