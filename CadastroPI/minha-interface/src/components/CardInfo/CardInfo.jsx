import React from 'react';
import './CardInfo.css';

function CardInfo({ title, text, image }) {
  return (
    <div className="card-info">
      <h3>{title}</h3>
      <p>{text}</p>
      <img src={image} alt="Imagem ilustrativa" />
    </div>
  );
}

export default CardInfo;
