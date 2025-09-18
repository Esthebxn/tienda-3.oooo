import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <h2 className="loading-text">TIENDITA 3.0</h2>
        <p className="loading-subtext">Cargando tu experiencia de compra...</p>
      </div>
    </div>
  );
};

export default Loading; 