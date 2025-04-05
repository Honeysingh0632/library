// src/components/Navbar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
//import './Navbar.css';  Optional: For styling

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
            Logo
          </NavLink>
          <div className="menu-icon" onClick={toggleMenu}>
            <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink to="/" className="nav-links" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-links" onClick={closeMenu}>
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-links" onClick={closeMenu}>
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/services" className="nav-links" onClick={closeMenu}>
              Services
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/new-addition" className="nav-links" onClick={closeMenu}>
              New Addition
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar2;
