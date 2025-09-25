import React, { useState, useRef, useEffect } from 'react';
import './SoporteWebChatbot.css';

const SoporteWebChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! 👋 Soy tu asistente virtual de ModaStyle. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    // Agregar mensaje del usuario
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simular respuesta del bot después de un delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("talla") || message.includes("tamaño")) {
      return {
        id: messages.length + 2,
        text: "Tenemos tallas desde XS hasta XXL. ¿Qué prenda te interesa? Puedo ayudarte con nuestra guía de tallas.",
        sender: "bot",
        timestamp: new Date()
      };
    } else if (message.includes("precio") || message.includes("coste")) {
      return {
        id: messages.length + 2,
        text: "Nuestros precios varían según la colección. Las prendas básicas desde $25 y las de diseñador desde $50. ¿Te interesa alguna prenda en particular?",
        sender: "bot",
        timestamp: new Date()
      };
    } else if (message.includes("devolución") || message.includes("cambio")) {
      return {
        id: messages.length + 2,
        text: "Aceptamos devoluciones dentro de los 30 días posteriores a la compra. La prenda debe estar en perfecto estado con etiquetas. ¿Necesitas ayuda con algún proceso específico?",
        sender: "bot",
        timestamp: new Date()
      };
    } else if (message.includes("envío") || message.includes("entrega")) {
      return {
        id: messages.length + 2,
        text: "Los envíos tardan 2-5 días hábiles. Envío gratis en compras mayores a $100. ¿Quieres conocer las opciones de envío disponibles en tu zona?",
        sender: "bot",
        timestamp: new Date()
      };
    } else {
      return {
        id: messages.length + 2,
        text: "Puedo ayudarte con: 📏 Guía de tallas | 💰 Precios y promociones | 🚚 Envíos y entregas | 🔄 Devoluciones | 👗 Recomendaciones de estilo. ¿En qué más puedo asistirte?",
        sender: "bot",
        timestamp: new Date()
      };
    }
  };

  const quickReplies = [
    "¿Qué tallas tienen?",
    "Precios y promociones",
    "Política de devoluciones",
    "Tiempos de envío"
  ];

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
  };

  return (
    <div className="chatbot-container">
      {/* Botón flotante */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="chatbot-icon">💬</span>
        <span className="chatbot-notification"></span>
      </button>

      {/* Ventana del chat */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">👗</div>
            <div>
              <h3>Asistente ModaStyle</h3>
              <span className="chatbot-status">En línea</span>
            </div>
          </div>
          <button 
            className="chatbot-close"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">
                {message.text}
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Respuestas rápidas */}
        {messages.length <= 2 && (
          <div className="quick-replies">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className="quick-reply-btn"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        <form className="chatbot-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="chatbot-input"
          />
          <button type="submit" className="chatbot-send-btn">
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default SoporteWebChatbot; 