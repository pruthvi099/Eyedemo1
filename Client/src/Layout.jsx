import React from 'react';
import Sidebar from "./Sidebar";
import Navbar from './Navbar';

import './Layout.css'; 

const Layout1 = ({ children }) => {
  return (
    <div className="layout-container">
      <Navbar /> 

      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout1;
