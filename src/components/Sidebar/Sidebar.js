// Sidebar.js
import React, { useEffect } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const submenuItems = document.querySelectorAll(".submenu_item");
    const sidebarOpen = document.querySelector("#sidebarOpen");
    const sidebarClose = document.querySelector(".collapse_sidebar");
    const sidebarExpand = document.querySelector(".expand_sidebar");

    // Event handler functions
    const handleSidebarToggle = () => sidebar.classList.toggle("close");
    const handleSidebarClose = () => sidebar.classList.add("close", "hoverable");
    const handleSidebarExpand = () => sidebar.classList.remove("close", "hoverable");

    const handleSidebarMouseEnter = () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.remove("close");
      }
    };

    const handleSidebarMouseLeave = () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.add("close");
      }
    };

    const submenuClickHandlers = [];

    // Attach event listeners for submenu items
    submenuItems.forEach((item, index) => {
      const handleSubmenuClick = (event) => {
        const clickedItem = event.currentTarget;
        clickedItem.classList.toggle("show_submenu");

        submenuItems.forEach((item2, idx) => {
          if (idx !== index) {
            item2.classList.remove("show_submenu");
          }
        });
      };

      item.addEventListener("click", handleSubmenuClick);
      submenuClickHandlers.push({ item, handleSubmenuClick });
    });

    // Attach other event listeners
    sidebarOpen.addEventListener("click", handleSidebarToggle);
    sidebarClose.addEventListener("click", handleSidebarClose);
    sidebarExpand.addEventListener("click", handleSidebarExpand);
    sidebar.addEventListener("mouseenter", handleSidebarMouseEnter);
    sidebar.addEventListener("mouseleave", handleSidebarMouseLeave);

    // Cleanup function
    return () => {
      sidebarOpen.removeEventListener("click", handleSidebarToggle);
      sidebarClose.removeEventListener("click", handleSidebarClose);
      sidebarExpand.removeEventListener("click", handleSidebarExpand);
      sidebar.removeEventListener("mouseenter", handleSidebarMouseEnter);
      sidebar.removeEventListener("mouseleave", handleSidebarMouseLeave);

      // Cleanup submenu click handlers
      submenuClickHandlers.forEach(({ item, handleSubmenuClick }) => {
        item.removeEventListener("click", handleSubmenuClick);
      });
    };
  }, []);




  // to adjust content-main according to sidebar width
  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const contentMain = document.querySelector(".content-main");

    const adjustContentMain = () => {
      const sidebarWidth = sidebar.offsetWidth;
      contentMain.style.marginLeft = `${sidebarWidth}px`;
    };

    // Initial adjustment
    adjustContentMain();

    // Event listeners for dynamic adjustment
    window.addEventListener("resize", adjustContentMain);
    sidebar.addEventListener("transitionend", adjustContentMain);

    return () => {
      window.removeEventListener("resize", adjustContentMain);
      sidebar.removeEventListener("transitionend", adjustContentMain);
    };
  }, []);


  return (
    // sidebar
    <nav class="sidebar">
      <div class="menu_content">
        <ul class="menu_items">
          <div class="menu_title menu_dahsboard"></div>

          <li class="item">
            <div href="#" class="nav_link submenu_item">
              <span class="navlink_icon">
                <i class="bx bx-home-alt"></i>
              </span>
              <span class="navlink">Home</span>
              <i class="bx bx-chevron-right arrow-left"></i>
            </div>

            <ul class="menu_items submenu">
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
            </ul>
          </li>

          <li class="item">
            <div href="#" class="nav_link submenu_item">
              <span class="navlink_icon">
                <i class="bx bx-grid-alt"></i>
              </span>
              <span class="navlink">Overview</span>
              <i class="bx bx-chevron-right arrow-left"></i>
            </div>

            <ul class="menu_items submenu">
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
            </ul>
          </li>

        </ul>

        <ul class="menu_items">
          <div class="menu_title menu_editor"></div>
          {/* duplicate these li tag if you want to add or remove navlink only */}

          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bxs-magic-wand"></i>
              </span>
              <span class="navlink">Magic build</span>
            </a>
          </li>

          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-loader-circle"></i>
              </span>
              <span class="navlink">Filters</span>
            </a>
          </li>
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-filter"></i>
              </span>
              <span class="navlink">Filter</span>
            </a>
          </li>
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-cloud-upload"></i>
              </span>
              <span class="navlink">Upload new</span>
            </a>
          </li>
        </ul>
        <ul class="menu_items">
          <div class="menu_title menu_setting"></div>
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-flag"></i>
              </span>
              <span class="navlink">Notice board</span>
            </a>
          </li>
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-medal"></i>
              </span>
              <span class="navlink">Award</span>
            </a>
          </li>
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-cog"></i>
              </span>
              <span class="navlink">Setting</span>
            </a>
          </li>
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-layer"></i>
              </span>
              <span class="navlink">Features</span>
            </a>
          </li>
        </ul>

        {/* <!-- Sidebar Open / Close --> */}
        <div class="bottom_content">
          <div class="bottom expand_sidebar">
            <span> Expand</span>
            <i class='bx bx-log-in' ></i>
          </div>
          <div class="bottom collapse_sidebar">
            <span> Collapse</span>
            <i class='bx bx-log-out'></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
