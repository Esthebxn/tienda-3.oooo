import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Camiseta Premium",
      price: 29.99,
      quantity: 2,
      image: "https://via.placeholder.com/80x80/2563eb/white?text=T-Shirt",
      size: "M",
      color: "Azul"
    },
    {
      id: 2,
      name: "Zapatos Deportivos",
      price: 89.99,
      quantity: 1,
      image: "https://via.placeholder.com/80x80/ef4444/white?text=Shoes",
      size: "42",
      color: "Negro"
    },
    {
      id: 3,
      name: "Pantalón Jeans",
      price: 45.50,
      quantity: 1,
      image: "https://via.placeholder.com/80x80/10b981/white?text=Jeans",
      size: "32",
      color: "Azul Oscuro"
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      // Simular proceso de checkout
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('¡Compra procesada exitosamente!');
      setCartItems([]);
      onClose();
    } catch (error) {
      console.error('Error en checkout:', error);
      alert('Error al procesar la compra');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={handleOverlayClick}>
      <div className="cart-modal">
        <div className="cart-header">
          <h2>
            <i className="fas fa-shopping-cart"></i>
            Carrito de Compras
            {cartItems.length > 0 && (
              <span className="cart-count-header">{getTotalItems()}</span>
            )}
          </h2>
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <i className="fas fa-shopping-cart empty-cart-icon"></i>
              <h3>Tu carrito está vacío</h3>
              <p>¡Agrega algunos productos y vuelve aquí!</p>
              <button className="continue-shopping" onClick={onClose}>
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <div className="item-specs">
                        <span>Talla: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                      <div className="item-price">${item.price}</div>
                    </div>

                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="quantity-btn"
                          disabled={item.quantity <= 1}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                      
                      <div className="item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="remove-button"
                        title="Eliminar producto"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal ({getTotalItems()} productos):</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Envío:</span>
                  <span className="free-shipping">Gratis</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button 
                  className="continue-shopping-btn"
                  onClick={onClose}
                >
                  Continuar Comprando
                </button>
                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-credit-card"></i>
                      Proceder al Pago
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart; 