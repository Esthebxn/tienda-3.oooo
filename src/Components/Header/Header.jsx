import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import Cart from '../Cart/Cart';
import Search from '../Search/Search';
import './Header.css';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(3); // Simulado

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-logo">
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

          <div className="header-actions">
            <button 
              className="header-search"
              onClick={openSearch}
              title="Buscar productos"
            >
              <i className="fas fa-search"></i>
            </button>
            
            <button 
              className="header-cart"
              onClick={openCart}
              title="Ver carrito de compras"
            >
              <i className="fas fa-shopping-cart"></i>
              {cartItemsCount > 0 && (
                <span className="cart-count">{cartItemsCount}</span>
              )}
            </button>
            
            <button 
              className="header-user"
              onClick={openLogin}
              title="Iniciar sesión"
            >
              <i className="fas fa-user"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Modales */}
      <Search 
        isOpen={isSearchOpen} 
        onClose={closeSearch} 
      />
      
      <Login 
        isOpen={isLoginOpen} 
        onClose={closeLogin} 
      />
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={closeCart} 
      />
    </>
  );
};

export default Header; 