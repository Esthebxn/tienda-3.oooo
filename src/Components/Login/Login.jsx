import React, { useState } from 'react';
import './Login.css';

const Login = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validaciones para registro
    if (!isLoginMode) {
      if (!formData.firstName) {
        newErrors.firstName = 'El nombre es requerido';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'El apellido es requerido';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirma tu contraseña';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isLoginMode) {
        // Lógica de login
        console.log('Login:', { email: formData.email, password: formData.password });
        alert('¡Login exitoso!');
      } else {
        // Lógica de registro
        console.log('Registro:', formData);
        alert('¡Registro exitoso!');
      }
      
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la solicitud');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });
    setErrors({});
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-overlay" onClick={handleOverlayClick}>
      <div className="login-modal">
        <div className="login-header">
          <h2>{isLoginMode ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="login-content">
          <form onSubmit={handleSubmit} className="login-form">
            {!isLoginMode && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Nombre</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? 'error' : ''}
                      placeholder="Tu nombre"
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Apellido</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'error' : ''}
                      placeholder="Tu apellido"
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="tu@email.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'error' : ''}
                placeholder="Tu contraseña"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {!isLoginMode && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="Confirma tu contraseña"
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            )}

            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  {isLoginMode ? 'Ingresando...' : 'Registrando...'}
                </>
              ) : (
                isLoginMode ? 'Iniciar Sesión' : 'Crear Cuenta'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              {isLoginMode ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <button 
                type="button" 
                className="toggle-mode-button"
                onClick={toggleMode}
              >
                {isLoginMode ? 'Regístrate' : 'Inicia Sesión'}
              </button>
            </p>
            
            {isLoginMode && (
              <button type="button" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 