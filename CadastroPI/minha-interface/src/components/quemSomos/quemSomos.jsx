import React from 'react';
import mulherComCachorro from '../../assets/mulherComCachorro.png';
import './quemSomos.css'

const QuemSomos = () => {
  return (
    <section className="quem-somos-section">
      <div className="quem-somos-content">
        <div className="quem-somos-img">
          <img src={mulherComCachorro} alt="Mulher com cachorro" />
        </div>
        <div className="quem-somos-texto">
          <h2>Quem somos nós?</h2>
          <p>
            A UPA (União Protetora dos Animais) de Lorena é uma associação dedicada ao resgate e proteção de cachorros em situação de abandono ou maus-tratos. O grupo atua acolhendo, tratando e buscando novos lares para os animais, além de promover campanhas de conscientização sobre a importância da adoção responsável e dos cuidados necessários para garantir o bem-estar dos bichinhos. Com a ajuda de voluntários e doações da comunidade, a UPA trabalha diariamente para oferecer uma vida digna e cheia de carinho para os cachorros resgatados.
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuemSomos;