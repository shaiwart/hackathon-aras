// Navbar.js
import React from "react";
import "./Navbar.css";
import logoImg from '../../assets/images/logo.png'
import profileImg from '../../assets/images/profile.jpg'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo_item">
        <i className="bx bx-menu" id="sidebarOpen"></i>
        {/* <img src={logoImg} alt="" /> */}
        <span className="logo_item_text" onClick={handleClickLogo}>innovator.aras</span>
      </div>


      <div className="search_bar">
        <input type="text" placeholder="Search" />
      </div>

      <div className="navbar_content">
        <i className="bi bi-grid"></i>
        <i className="bx bx-sun" id="darkLight"></i>
        <i className="bx bx-bell"></i>
        <img src={profileImg} alt="" className="profile" />
      </div>
    </nav>
  );
};

export default Navbar;
