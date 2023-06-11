import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.scss'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <button className="navbar-toggle" onClick={toggleMenu}>
        <span className="navbar-toggle-icon"></span>
      </button>

      <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
        <li className="navbar-menu-item">
          {/* <Link to="/">Login</Link> */}
        </li>
        <li className="navbar-menu-item">
          <Link to="/analytics">Analytics</Link>
        </li>
        <li className="navbar-menu-item">
          <Link to="/revoke">Revoke Access</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
