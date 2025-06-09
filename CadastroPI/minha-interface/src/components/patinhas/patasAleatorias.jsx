import React from "react";
import patinha from "../../assets/patinha.png";
import "./patasAleatorias.css";

export default function PatasAleatorias({ quantidade = 20 }) {
  const gerarPatinhas = () => {
    const patinhas = [];
    const posicoes = [];

    const distanciaMinima = 15; // distância mínima em vw/vh para evitar sobreposição

    const distancia = (x1, y1, x2, y2) => {
      return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    };

    for (let i = 0; i < quantidade; i++) {
      let left, top, tentativas = 0;
      do {
        left = Math.random() * 100;
        top = Math.random() * 100;
        tentativas++;
        // evita ficar preso num loop infinito
        if (tentativas > 100) break; 
      } while (
        posicoes.some(
          ([x, y]) => distancia(left, top, x, y) < distanciaMinima
        )
      );
      
      posicoes.push([left, top]);

      const delay = Math.random() * 5;
      patinhas.push(
        <img
          key={i}
          src={patinha}
          alt="Patinha"
          className="pata"
          style={{
            left: `${left}vw`,
            top: `${top}vh`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
    return patinhas;
  };

  return <>{gerarPatinhas()}</>;
}
