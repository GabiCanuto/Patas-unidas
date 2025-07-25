import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './HeaderTelaInicial.css';  // lembre de criar este arquivo CSS com as classes renomeadas
import logo from "../../assets/logo.png";

export default function HeaderTelaInicial() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isDoacoesActive = ['/doacao', '/pagamento'].includes(location.pathname);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen((open) => !open);
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

  return (
    <header className='header-tela-inicial'>
      <div className='header-tela-inicial-left'>
        <img src={logo} alt="Logo Patas Unidas" className="logo-tela-inicial" />
        <span className='company-name-tela-inicial'>Patas Unidas</span>
      </div>

      <nav className={`header-tela-inicial-nav ${menuOpen ? 'open' : ''}`}>
        <NavLink 
          to="/register" 
          className={({ isActive }) => isActive ? 'active-link-tela-inicial' : ''}
          onClick={() => setMenuOpen(false)}
        >
          <i className="fas fa-home"></i> Home
        </NavLink>
        <NavLink 
          to="/register" 
          className={({ isActive }) => isActive ? 'active-link-tela-inicial' : ''}
          onClick={() => setMenuOpen(false)}
        >
          <i className="fas fa-paw"></i> Vitrine
        </NavLink>
        <NavLink 
          to="/register" 
          className={() => isDoacoesActive ? 'active-link-tela-inicial' : ''}
          onClick={() => setMenuOpen(false)}
        >
          <i className="fas fa-hand-holding-heart"></i> Doações
        </NavLink>
        <div className="perfil-link-wrapper-tela-inicial" ref={dropdownRef}>
          <a
            href="#meu-perfil"
            className="perfil-link-tela-inicial"
            onClick={toggleDropdown}
            tabIndex={0}
          >
            <i className="fas fa-user"></i> Meu Perfil <i className="fas fa-chevron-down"></i>
          </a>
          {dropdownOpen && (
            <div className="perfil-dropdown-tela-inicial">
              <NavLink to="/register" onClick={() => setDropdownOpen(false)}>
                <i className="fas fa-user-circle"></i> Meu Perfil
              </NavLink>
              <NavLink to="/register" onClick={() => setDropdownOpen(false)}>
                <i className="fas fa-cog"></i> Configurações
              </NavLink>
              <NavLink to="/register" onClick={() => setDropdownOpen(false)}>
                <i className="fas fa-hands-helping"></i> Apadrinhamentos
              </NavLink>
              <NavLink to="/register" onClick={() => setDropdownOpen(false)}>
                <i className="fas fa-dog"></i> Adoções
              </NavLink>
              <button className="logout-btn-tela-inicial" onClick={() => {/* lógica de logout */}}>
                <i className="fas fa-sign-out-alt"></i> Sair
              </button>
            </div>
          )}
        </div>
      </nav>

      <button 
        className="menu-toggle-tela-inicial" 
        onClick={toggleMenu} 
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
      >
        <span className="hamburger-tela-inicial"></span>
        <span className="hamburger-tela-inicial"></span>
        <span className="hamburger-tela-inicial"></span>
      </button>

      {menuOpen && <div className="overlay-tela-inicial" onClick={toggleMenu}></div>}
    </header>
  );
}