import React from 'react';
import dogImage from '../../assets/dogHero.png';
import './dogSection.css';

const DogSection = ({
  onCadastroClick,
  onSobreNosClick,
  showButtons = true,
  title = (
    <>
      Olá amigo! Seja bem-vindo! <br /> Estava esperando por você.
    </>
  ),
}) => {
  return (
    <section className="dogSection-container">
      <div className="dogSection-text">
        <h1>{title}</h1>
        {showButtons && (
          <div className="dogSection-textButtonContainer">
            <button onClick={onSobreNosClick}>Sobre nós</button>
            <button onClick={onCadastroClick}>Cadastrar</button>
          </div>
        )}
      </div>
      <div className="dogSection-image">
        <img src={dogImage} alt="Cachorro feliz" />
      </div>
    </section>
  );
};

export default DogSection;