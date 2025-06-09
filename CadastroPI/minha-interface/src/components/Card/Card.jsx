import React from "react";
import './Card.css';

export default function Card({ titulo, descricao, img, textoBotao, onClick, classImg }) {
    return (
        <div className="card-pagamento">
            <h2>{titulo}</h2>
            <p>{descricao}</p>
            <img src={img} alt={titulo} className={`card-img ${classImg || ''}`} />
            <button className="card-button2" onClick={onClick}>{textoBotao}</button>
        </div>
    );
}
