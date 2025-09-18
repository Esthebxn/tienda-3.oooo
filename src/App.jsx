import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import Loading from "./Components/Loading/Loading";
import "./index.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos de loading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main className="main-content">
              <h1>Bienvenido a TIENDITA 3.0</h1>
              <p>Tu tienda en línea de confianza</p>
            </main>
          } />
          <Route path="/productos" element={
            <main className="main-content">
              <h1>Nuestros Productos</h1>
              <p>Descubre nuestra amplia variedad</p>
            </main>
          } />
          <Route path="/categorias" element={
            <main className="main-content">
              <h1>Categorías</h1>
              <p>Explora por categorías</p>
            </main>
          } />
          <Route path="/ofertas" element={
            <main className="main-content">
              <h1>Ofertas Especiales</h1>
              <p>Las mejores promociones para ti</p>
            </main>
          } />
          <Route path="/contacto" element={
            <main className="main-content">
              <h1>Contacto</h1>
              <p>Estamos aquí para ayudarte</p>
            </main>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 