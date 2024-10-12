// src/components/Layout.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import xogeneLogo from '../assets/xogene-logo.png'; // Adjust the path if necessary

const Layout = ({ children }) => {
  return (
    <div>
      {/* Header Section with Logo */}
      <header className="flex items-center p-3 bg-gray-100 shadow-md"> {/* Reduced padding */}
        <Link to="/">
          <img src={xogeneLogo} alt="Xogene Logo" className="h-8 mr-2" /> {/* Reduced height */}
        </Link>
        <h1 className="text-2xl font-bold">Xogene</h1> {/* Reduced title size */}
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-4"> {/* Reduced max width */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
