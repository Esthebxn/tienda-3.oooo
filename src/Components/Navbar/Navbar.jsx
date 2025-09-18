import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <div className="logo-svg">
              <svg width="40" height="40" viewBox="0 0 50 50">
                <rect x="10" y="10" width="30" height="30" rx="5" fill="#2563eb" />
                <text x="25" y="32" textAnchor="middle" fill="white" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="bold">T3</text>
              </svg>
            </div>
            <span>Merz Tech</span>
          </Link>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
          </li>
          <li className="navbar-item">
            <Link to="/productos" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Productos</Link>
          </li>
          <li className="navbar-item">
            <Link to="/categorias" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Categorías</Link>
          </li>
          <li className="navbar-item">
            <Link to="/ofertas" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Ofertas</Link>
          </li>
          <li className="navbar-item">
            <Link to="/contacto" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <button className="navbar-search">
            <i className="fas fa-search"></i>
          </button>
          <button className="navbar-cart">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">0</span>
          </button>
          <button className="navbar-user">
            <i className="fas fa-user"></i>
          </button>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 