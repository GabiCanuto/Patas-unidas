import React from 'react';
import dogImage from '../../assets/dogHero.png';
import './SectionAmarela.css';

const SectionAmarela = () => {
  return (
    <section className="welcome-section">
      <div className="welcome-text">
        <h1>
          Olá amigo! Seja bem-vindo! <br /> Estava esperando por você.
        </h1>
      </div>
      <div className="welcome-image">
        <img src={dogImage} alt="Cachorro feliz" />
      </div>
    </section>
  );
};

export default SectionAmarela;