import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';
import PatasAleatorias from '../../components/patinhas/patasAleatorias';
import Footer from '../../components/footer/Footer';
import './pagamento.css';

import imgPix from '../../assets/icon-apadrinhe.png';
import imgCartao from '../../assets/icon-doacao.png';

export default function Pagamento() {
  const navigate = useNavigate();
  const [mostrarFormasPagamento, setMostrarFormasPagamento] = useState(false);

  return (
    <div className="pagamento-wrapper">
      <div className="patinhas-background">
        <PatasAleatorias quantidade={20} />
      </div>

      <div className="pagamento-conteudo">
        <Header />

        <div className="conteudo-entre-header-footer">
          <h1 className="titulo-page">Escolha uma forma de transformar vidas!</h1>
          <p className="paragrafo">
            Faça uma doação ou apadrinhe nossos pets e ajude com os cuidados de nossos amigos.
          </p>

          {/* Botão "Não" que mostra as formas de pagamento */}
          {!mostrarFormasPagamento && (
            <button onClick={() => setMostrarFormasPagamento(true)}>
              Não
            </button>
          )}

          {/* Mostrar as formas de pagamento quando o estado for true */}
          {mostrarFormasPagamento && (
            <div className="container-cards">
              <Card 
                titulo="Faça uma doação" 
                descricao="Doe amor, doe esperança. Sua contribuição transforma vidas, levando cuidado, carinho e dignidade para quem mais precisa." 
                img={imgCartao} 
                textoBotao="Fazer doação"
                classImg="img-doacao"
                onClick={() => navigate('/doacao')}
              />
              <Card 
                titulo="Apadrinhe um pet" 
                descricao="Apadrinhar é espalhar amor. Com sua ajuda mensal, garantimos alimento, cuidados e muito carinho aos nossos pets, mudando suas vidas todos os dias." 
                img={imgPix} 
                textoBotao="Apadrinhar" 
                onClick={() => navigate('/apadrinhar')}
              />
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}