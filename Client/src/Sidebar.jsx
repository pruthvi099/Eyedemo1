import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaUser, FaExchangeAlt, FaMoneyBillWave, FaClipboardList, FaTruck, FaSignOutAlt, FaBarcode } from 'react-icons/fa';
import './Sidebar.css';
import logo from './assets/logo.jpg';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname.startsWith(path) ? 'active' : '';

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div id="sidebar" className="sidebar">
      <div id="sidelogo" className="sidelogo">
        <img src={logo} alt="Your Logo" id="sidebar-logo-img" />
      </div>
      <ul id="sidebar-menu" className="sidebar-menu">
        <li id="sidebar-item-dashboard" className={`sidebar-item ${isActive('/dashboard')}`}>
          <Link to="/dashboard" className="menuLink flex">
            <FaHome />
            <span>Dashboard</span>
          </Link>
        </li>
        <li id="sidebar-item-products" className={`sidebar-item ${isActive('/productlist')}`}>
          <Link to="/productlist" className="menuLink flex">
            <FaShoppingCart />
            <span>Products</span>
          </Link>
        </li>
        <li id="sidebar-item-customers" className={`sidebar-item ${isActive('/customerlist')}`}>
          <Link to="/customerlist" className="menuLink flex">
            <FaUser />
            <span>Customers</span>
          </Link>
        </li>
        <li id="sidebar-item-transactions" className={`sidebar-item ${isActive('/transactionlist')}`}>
          <Link to="/transactionlist" className="menuLink flex">
            <FaExchangeAlt />
            <span>Transactions</span>
          </Link>
        </li>
        <li id="sidebar-item-sales" className={`sidebar-item ${isActive('/salelist')}`}>
          <Link to="/salelist" className="menuLink flex">
            <FaMoneyBillWave />
            <span>Sales</span>
          </Link>
        </li>
        <li id="sidebar-item-purchases" className={`sidebar-item ${isActive('/purchaselist')}`}>
          <Link to="/purchaselist" className="menuLink flex">
            <FaClipboardList />
            <span>Purchases</span>
          </Link>
        </li>
        <li id="sidebar-item-suppliers" className={`sidebar-item ${isActive('/supplierlist')}`}>
          <Link to="/supplierlist" className="menuLink flex">
            <FaTruck />
            <span>Suppliers</span>
          </Link>
        </li>
        <li id="sidebar-item-barcode" className={`sidebar-item ${isActive('/barcodescanner')}`}>
          <Link to="/barcodescanner" className="menuLink flex">
            <FaBarcode />
            <span>Barcode</span>
          </Link>
        </li>
        <li id="logout" className="logout" onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </li>
      </ul>
      
    </div>
  );
};

export default Sidebar;
