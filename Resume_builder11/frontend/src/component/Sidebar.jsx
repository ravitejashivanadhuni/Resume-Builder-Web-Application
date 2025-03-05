import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import closeIcon from "../assets/close.svg";
import logoLight from "../assets/logo-light.png";
import pencilIcon from "../assets/pencil.svg";
import { sidebarItems } from "../sidebar/sidebardata";

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleItemClick = (item) => {
    setActiveItem(item.name);
    localStorage.setItem("activeItem", item.name);
  };

  useEffect(() => {
    const storedActiveItem = localStorage.getItem("activeItem");
    if (storedActiveItem) {
      setActiveItem(storedActiveItem);
    }

    const currentSidebarItem = sidebarItems.find((item) =>
      location.pathname.endsWith(item.path)
    );
    if (currentSidebarItem) {
      handleItemClick(currentSidebarItem);
    }
  }, [location.pathname]);

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen w-[280px] bg-[#f4f4f4] p-4 shadow-lg border border-gray-200 lg:block z-[9999] transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 lg:hidden bg-[#005151] text-[] px-2 py-2 rounded-full shadow-md"
        >
          <img src={closeIcon} className="w-[18px] h-[18px]" alt="" />
        </button>
        <div className="ml-[250px] max-sm:ml-0 max-lg:ml-0 max-md:ml-0">
          <img
            src={logoLight}
            className="w-56 max-sm:w-[190px] max-md:w-[200px] max-md:hidden max-sm:block"
            alt=" "
          />
        </div>
        <div className="flex flex-col items-center justify-center mb-6 mt-5">
          <div className="relative">
            <img
              src={
                currentUser?.profilePhoto?.url ||
                "https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1.jpg"
              }
              alt="Profile"
              className="w-[110px] h-[110px] rounded-full mb-3 border-2 border-gray-300 cursor-pointer"
            />
            <Link to="/user/update-profile">
              <img
                src={pencilIcon}
                alt=""
                className="absolute z-99 w-[25px] h-[25px] -bottom-15 top-[70px] bg-white rounded-lg"
                style={{ right: '-5px' }}
              />
            </Link>
          </div>

          <p className="text-lg font-semibold text-[#005151] capitalize">
            {currentUser?.first_Name} {currentUser?.last_Name}
          </p>
          <p className="text-sm text-gray-500 capitalize">
            {currentUser?.role}
          </p>
        </div>

        {/* Sidebar Menu */}
        <nav>
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <div className="relative">
                  <NavLink
                    to={item.path}
                    className={`flex items-center mb-[10px] text-sm font-medium rounded-lg p-[14px] group text-[#6c757d] ${
                      activeItem === item.name
                        ? "bg-[#005151] text-white border"
                        : "hover:bg-[#cecece75]"
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <span
                      className={`lg:inline transition duration-0 font-medium leading-[19.5px] text-[13px] ${
                        activeItem === item.name ? "text-white" : ""
                      }`}
                    >
                      {item.name}
                    </span>
                  </NavLink>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
