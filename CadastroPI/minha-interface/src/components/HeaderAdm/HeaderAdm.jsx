import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './HeaderAdm.css';
import logo from "../../assets/logo.png";

export default function HeaderAdm() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Verifica se estamos em alguma rota do processo de doações
  const isDoacoesActive = ['/doacao', '/pagamento'].includes(location.pathname);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className='header-adm'>
      <div className='header-adm-left'>
        <img src={logo} alt="Logo Patas Unidas" className="header-adm-logo" />
        <span className='header-adm-company-name'>Patas Unidas</span>
      </div>

      <nav className={`header-adm-nav ${menuOpen ? 'header-adm-nav-open' : ''}`}>
        <NavLink 
          to="/tela-inicial" 
          className={({ isActive }) => isActive ? 'header-adm-active-link' : ''}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink 
          to="/vitrine" 
          className={({ isActive }) => isActive ? 'header-adm-active-link' : ''}
          onClick={() => setMenuOpen(false)}
        >
          Vitrine
        </NavLink>
        <NavLink 
          to="/pagamento" 
          className={() => isDoacoesActive ? 'header-adm-active-link' : ''}
          onClick={() => setMenuOpen(false)}
        >
          Doações
        </NavLink>
        <a href="#meu-perfil" onClick={() => setMenuOpen(false)}>Meu Perfil</a>
      </nav>

      <button 
        className="header-adm-menu-toggle" 
        onClick={toggleMenu} 
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
      >
        <span className="header-adm-hamburger"></span>
        <span className="header-adm-hamburger"></span>
        <span className="header-adm-hamburger"></span>
      </button>

      {menuOpen && <div className="header-adm-overlay" onClick={toggleMenu}></div>}
    </header>
  );
}