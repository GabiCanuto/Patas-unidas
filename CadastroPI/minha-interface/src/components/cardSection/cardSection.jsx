import React from 'react';
import './cardSection.css';
import iconApadrinhe from '../../assets/icon-apadrinhe.png';
import iconAdote from '../../assets/icon-adote.png';
import iconDoacao from '../../assets/icon-doacao.png';

const cardsData = [
  {
    imgSrc: iconApadrinhe,
    altText: 'Apadrinhe um animal',
    title: 'Apadrinhe um animal!',
    description: 'Nem sempre podemos adotar, mas sempre podemos mudar uma vida. No apadrinhamento da UPA, você escolhe um dos cãezinhos resgatados para ajudar com os custos de alimentação, vacinas, remédios e cuidados diários. Seu apoio garante mais conforto e saúde enquanto eles esperam por uma família definitiva. Com um gesto simples, você faz parte da história de superação de um amigo de quatro patas. Apadrinhe e transforme vidas!',
  },
  {
    imgSrc: iconAdote,
    altText: 'Adote seu melhor amigo',
    title: 'Adote seu melhor amigo!',
    description: 'Adotar é um ato de amor que transforma vidas. Na UPA, muitos cãezinhos esperam por uma família para chamar de sua. Cada adoção é uma nova história de esperança, carinho e amizade verdadeira. Dê uma nova chance a quem só precisa de amor. Adote!',
  },
  {
    imgSrc: iconDoacao,
    altText: 'Nos ajude fazendo uma doação',
    title: 'Doe e faça história',
    description: `Cada vida importa. Na UPA de Lorena, centenas de animais resgatados esperam por amor, cuidado e uma nova chance. Sua doação é mais do que alimento ou remédio — é esperança para quem já sofreu demais. Com um pequeno gesto, você pode transformar a dor em alegria e dar a esses animais o futuro que eles merecem. Doe e seja a luz no caminho deles!`,
  },
];

const CardsSection = () => {
  return (
    <div className="cardsHome">
      {cardsData.map(({ imgSrc, altText, title, description }, index) => (
        <div className="cardHome" key={index}>
          <div className="cardHome-img-container">
            <img
              src={imgSrc}
              alt={altText}
              className={index === 2 ? 'ajustar-img-terceira' : ''}
            />
          </div>
          <p className="card-title">{title}</p>

          {/* Texto que aparece no hover */}
          <div className="textoCardHover">
            <span className="hover-text">{description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsSection;