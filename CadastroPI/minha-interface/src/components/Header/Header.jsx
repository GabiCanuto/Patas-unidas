import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import logo from "../../assets/logo.png";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isDoacoesActive = ['/doacao', '/pagamento'].includes(location.pathname);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(open => !open);
  };

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Fecha menu ao clicar em link
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className='header-usuario'>
      <div className='header-usuario-left'>
        <img src={logo} alt="Logo Patas Unidas" className="logo-usuario" />
        <span className='company-name-usuario'>Patas Unidas</span>
      </div>

      <nav className={`header-usuario-nav ${menuOpen ? 'open' : ''}`}>
        <NavLink 
          to="/home" 
          className={({ isActive }) => isActive ? 'active-link-usuario' : ''}
          onClick={handleLinkClick}
        >
          <i className="fas fa-home"></i> Home
        </NavLink>
        <NavLink 
          to="/vitrine" 
          className={({ isActive }) => isActive ? 'active-link-usuario' : ''}
          onClick={handleLinkClick}
        >
          <i className="fas fa-paw"></i> Vitrine
        </NavLink>
        <NavLink 
          to="/pagamento" 
          className={() => isDoacoesActive ? 'active-link-usuario' : ''}
          onClick={handleLinkClick}
        >
          <i className="fas fa-hand-holding-heart"></i> Doações
        </NavLink>
        <div className="perfil-link-wrapper-usuario" ref={dropdownRef}>
          <a
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            className="perfil-link-usuario"
            onClick={toggleDropdown}
            tabIndex={0}
          >
            <i className="fas fa-user"></i> Meu Perfil <i className="fas fa-chevron-down"></i>
          </a>
          {dropdownOpen && (
            <div className="perfil-dropdown-usuario">
              <NavLink to="/meu-perfil" onClick={() => setDropdownOpen(false)}>
                <i className="fas fa-user-circle"></i> Meu Perfil
              </NavLink>
              <NavLink to="/configuracoes" onClick={() => setDropdownOpen(false)}>
                <i className="fas fa-cog"></i> Configurações
              </NavLink>
              <NavLink to="/visualiza-apadrinhamento" onClick={() => setDropdownOpen(false)}>
                <i className="fas fa-hands-helping"></i> Apadrinhamentos
              </NavLink>
              <NavLink to="/adocoes" onClick={() => setDropdownOpen(false)}>
                <i className="fas fa-dog"></i> Adoções
              </NavLink>
              <button 
                type="button" 
                className="logout-btn-usuario" 
                onClick={() => {/* lógica de logout */}}
              >
                <i className="fas fa-sign-out-alt"></i> Sair
              </button>
            </div>
          )}
        </div>
      </nav>

      <button 
        className="menu-toggle-usuario" 
        onClick={toggleMenu} 
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
      >
        <span className="hamburger-usuario"></span>
        <span className="hamburger-usuario"></span>
        <span className="hamburger-usuario"></span>
      </button>

      {menuOpen && <div className="overlay-usuario" onClick={toggleMenu} aria-hidden="true"></div>}
    </header>
  );
}