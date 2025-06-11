import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import logo from "../../assets/logo.png";

export default function Header() {
  const location = useLocation();

  // Verifica se estamos em alguma rota do processo de doações
  const isDoacoesActive = ['/doacao', '/pagamento'].includes(location.pathname);

  return (
    <header className='header'>
      <div className='header-left'>
        <img src={logo} alt="Logo Patas Unidas" />
        <span className='company-name'>Patas Unidas</span>
      </div>

      <nav className='header-nav'>
        <NavLink 
          to="/tela-inicial" 
          className={({ isActive }) => isActive ? 'active-link' : ''}
        >
          Home
        </NavLink>
        <NavLink 
          to="/vitrine" 
          className={({ isActive }) => isActive ? 'active-link' : ''}
        >
          Vitrine
        </NavLink>
        <NavLink 
          to="/pagamento" 
          className={() => isDoacoesActive ? 'active-link' : ''}
        >
          Doações
        </NavLink>
        <a href="#meu-perfil">Meu Perfil</a>
      </nav>
    </header>
  );
}
