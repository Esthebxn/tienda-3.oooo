import React, { useState, useEffect, useRef } from 'react';
import './Search.css';

const Search = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'Camisetas',
    'Zapatos deportivos',
    'Pantalones jeans',
    'Accesorios'
  ]);
  const [popularSearches] = useState([
    'Nueva colección',
    'Ofertas del día',
    'Ropa casual',
    'Zapatos',
    'Accesorios',
    'Ropa deportiva'
  ]);

  const searchInputRef = useRef(null);

  // Productos de ejemplo para resultados de búsqueda
  const mockProducts = [
    {
      id: 1,
      name: 'Camiseta Premium Algodón',
      price: 29.99,
      image: 'https://via.placeholder.com/60x60/2563eb/white?text=T-Shirt',
      category: 'Ropa de Hombre'
    },
    {
      id: 2,
      name: 'Zapatos Deportivos Nike',
      price: 89.99,
      image: 'https://via.placeholder.com/60x60/ef4444/white?text=Shoes',
      category: 'Calzado'
    },
    {
      id: 3,
      name: 'Pantalón Jeans Slim Fit',
      price: 45.50,
      image: 'https://via.placeholder.com/60x60/10b981/white?text=Jeans',
      category: 'Ropa de Hombre'
    },
    {
      id: 4,
      name: 'Blusa Elegante Mujer',
      price: 35.00,
      image: 'https://via.placeholder.com/60x60/f59e0b/white?text=Blouse',
      category: 'Ropa de Mujer'
    },
    {
      id: 5,
      name: 'Reloj Deportivo Digital',
      price: 120.00,
      image: 'https://via.placeholder.com/60x60/8b5cf6/white?text=Watch',
      category: 'Accesorios'
    },
    {
      id: 6,
      name: 'Mochila Escolar',
      price: 25.99,
      image: 'https://via.placeholder.com/60x60/06b6d4/white?text=Bag',
      category: 'Accesorios'
    }
  ];

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simular búsqueda con delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filtrar productos que coincidan con la búsqueda
      const filtered = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(filtered);
    } catch (error) {
      console.error('Error en búsqueda:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Búsqueda en tiempo real con debounce
    if (value.trim()) {
      const timeoutId = setTimeout(() => {
        handleSearch(value);
      }, 300);
      
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Agregar a búsquedas recientes
      setRecentSearches(prev => {
        const updated = [searchQuery, ...prev.filter(item => item !== searchQuery)];
        return updated.slice(0, 5); // Mantener solo 5 búsquedas recientes
      });
      
      handleSearch(searchQuery);
    }
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    searchInputRef.current?.focus();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Cerrar con ESC y enfocar input al abrir
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Enfocar el input después de que se abra el modal
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="search-overlay" onClick={handleOverlayClick}>
      <div className="search-modal">
        <div className="search-header">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-input-container">
              <i className="fas fa-search search-icon"></i>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={handleInputChange}
                className="search-input"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="clear-search"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </form>
          
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="search-content">
          {isLoading ? (
            <div className="search-loading">
              <i className="fas fa-spinner fa-spin"></i>
              <span>Buscando...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="search-results">
              <h3 className="results-title">
                Resultados para "{searchQuery}" ({searchResults.length})
              </h3>
              <div className="results-list">
                {searchResults.map(product => (
                  <div key={product.id} className="result-item">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="result-image"
                    />
                    <div className="result-info">
                      <h4 className="result-name">{product.name}</h4>
                      <span className="result-category">{product.category}</span>
                      <span className="result-price">${product.price}</span>
                    </div>
                    <button className="add-to-cart-btn">
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : searchQuery ? (
            <div className="no-results">
              <i className="fas fa-search no-results-icon"></i>
              <h3>No se encontraron resultados</h3>
              <p>Intenta con otros términos de búsqueda</p>
            </div>
          ) : (
            <div className="search-suggestions">
              {recentSearches.length > 0 && (
                <div className="suggestion-section">
                  <h3 className="suggestion-title">
                    <i className="fas fa-history"></i>
                    Búsquedas recientes
                  </h3>
                  <div className="suggestion-tags">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="suggestion-tag recent"
                        onClick={() => handleQuickSearch(search)}
                      >
                        <i className="fas fa-history"></i>
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="suggestion-section">
                <h3 className="suggestion-title">
                  <i className="fas fa-fire"></i>
                  Búsquedas populares
                </h3>
                <div className="suggestion-tags">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      className="suggestion-tag popular"
                      onClick={() => handleQuickSearch(search)}
                    >
                      <i className="fas fa-trending-up"></i>
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search; 