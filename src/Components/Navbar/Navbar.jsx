import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const submenuRef = useRef(null);

  const toggleSubmenu = (menuName) => {
    setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
  };

  const closeSubmenu = () => {
    setActiveSubmenu(null);
  };

  // Cerrar submenús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        closeSubmenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Datos de los submenús
  const submenusData = {
    productos: {
      title: "Productos",
      items: [
        { name: "Nueva Colección", path: "/productos/nueva-coleccion" },
        { name: "Ropa de Hombre", path: "/productos/hombre" },
        { name: "Ropa de Mujer", path: "/productos/mujer" },
        { name: "Ropa Infantil", path: "/productos/infantil" },
        { name: "Accesorios", path: "/productos/accesorios" },
        { name: "Zapatos", path: "/productos/zapatos" }
      ]
    },
    categorias: {
      title: "Categorías",
      items: [
        { name: "Ver Todas", path: "/categorias/todas" },
        { name: "Ropa Deportiva", path: "/categorias/deportiva" },
        { name: "Ropa Formal", path: "/categorias/formal" },
        { name: "Ropa Casual", path: "/categorias/casual" },
        { name: "Ropa de Verano", path: "/categorias/verano" },
        { name: "Ropa de Invierno", path: "/categorias/invierno" }
      ]
    },
    ofertas: {
      title: "Ofertas",
      items: [
        { name: "Ofertas del Día", path: "/ofertas/dia" },
        { name: "Descuentos hasta 50%", path: "/ofertas/50-descuento" },
        { name: "Liquidación", path: "/ofertas/liquidacion" },
        { name: "Pack Especiales", path: "/ofertas/packs" },
        { name: "Outlet", path: "/ofertas/outlet" }
      ]
    },
    contacto: {
      title: "Contacto",
      items: [
        { name: "Soporte Técnico", path: "/contacto/soporte" },
        { name: "Preguntas Frecuentes", path: "/contacto/faq" },
        { name: "Envíos y Entregas", path: "/contacto/envios" },
        { name: "Devoluciones", path: "/contacto/devoluciones" },
        { name: "Trabaja con Nosotros", path: "/contacto/trabajo" }
      ]
    }
  };

  const NavbarItemWithSubmenu = ({ menuKey, data }) => (
    <li className="navbar-item has-submenu" ref={submenuRef}>
      <button 
        className={`navbar-link submenu-trigger ${activeSubmenu === menuKey ? 'active' : ''}`}
        onClick={() => toggleSubmenu(menuKey)}
        onMouseEnter={() => setActiveSubmenu(menuKey)}
      >
        {data.title}
        <i className={`fas fa-chevron-${activeSubmenu === menuKey ? 'up' : 'down'} submenu-icon`}></i>
      </button>
      
      <div 
        className={`submenu ${activeSubmenu === menuKey ? 'active' : ''}`}
        onMouseLeave={() => closeSubmenu()}
      >
        <div className="submenu-content">
          <h4 className="submenu-title">{data.title}</h4>
          <ul className="submenu-list">
            {data.items.map((item, index) => (
              <li key={index} className="submenu-item">
                <Link 
                  to={item.path} 
                  className="submenu-link"
                  onClick={closeSubmenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Inicio
            </Link>
          </li>
          
          <NavbarItemWithSubmenu menuKey="productos" data={submenusData.productos} />
          <NavbarItemWithSubmenu menuKey="categorias" data={submenusData.categorias} />
          <NavbarItemWithSubmenu menuKey="ofertas" data={submenusData.ofertas} />
          <NavbarItemWithSubmenu menuKey="contacto" data={submenusData.contacto} />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 