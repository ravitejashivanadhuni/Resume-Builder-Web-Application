import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { axiosInstance, endPoints } from '../api/axios';
import { sidebarItems } from '../sidebar/sidebardata';

const Navbar = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    try {
      await axiosInstance.get(endPoints.auth.logout);
      toast.success('Logged out successfully.');
      navigate('/');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-blue-600">ResumeBuilder</h1>
            </Link>
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden lg:flex flex-1 items-center justify-center px-8 space-x-1">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => `
                  px-2 py-2 rounded-md text-sm font-medium transition-all duration-200
                  flex items-center space-x-1 whitespace-nowrap
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }
                `}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon || (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={
                        item.name.includes('Resume Builder') 
                          ? "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          : item.name.includes('ATS Score')
                          ? "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          : item.name.includes('Enhance Resume')
                          ? "M13 10V3L4 14h7v7l9-11h-7z"
                          : item.name.includes('Upgrade Resume')
                          ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          : item.name.includes('Templates')
                          ? "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                          : item.name.includes('My Projects')
                          ? "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                          : item.name.includes('About Us')
                          ? "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          : item.name.includes('Contact Us')
                          ? "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          : "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      } 
                    />
                  )}
                </svg>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link
              to={`/${currentUser?.role}/edit-profile`}
              className="relative group flex items-center"
            >
              <button className="flex items-center space-x-2 px-3 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200">
                <img
                  src={currentUser?.profilePhoto?.url || "https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1.jpg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-blue-200"
                />
                <span className="font-medium capitalize hidden sm:inline">
                  {currentUser?.first_Name}
                </span>
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium hidden sm:inline">Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => `
                  block px-3 py-2 rounded-md text-base font-medium transition-all duration-200
                  flex items-center space-x-2
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon || (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={
                        item.name.includes('Resume Builder') 
                          ? "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          : item.name.includes('ATS Score')
                          ? "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          : item.name.includes('Enhance Resume')
                          ? "M13 10V3L4 14h7v7l9-11h-7z"
                          : item.name.includes('Upgrade Resume')
                          ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          : item.name.includes('Templates')
                          ? "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                          : item.name.includes('My Projects')
                          ? "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                          : item.name.includes('About Us')
                          ? "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          : item.name.includes('Contact Us')
                          ? "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          : "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      } 
                    />
                  )}
                </svg>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
