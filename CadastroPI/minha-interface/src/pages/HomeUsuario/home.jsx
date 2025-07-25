import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import DogSection from '../../components/dogSection/dogSection';
import CardsSection from '../../components/cardSection/cardSection';
import QuemSomos from '../../components/quemSomos/quemSomos';
import FeedbacksCarousel from '../../components/feedbacks/feedbacks';
import Footer from '../../components/footer/Footer';
import PatasAleatorias from '../../components/patinhas/patasAleatorias';

import './home.css';

export default function HomeUsuario() {
  const navigate = useNavigate();

  const irParaCadastro = () => {
    navigate('/cadastro');
  };

  return (
    <div className="home-usuario">
      {/* Patinhas decorativas no fundo */}
      <div className="home-usuario-patinhas-bg">
        <PatasAleatorias quantidade={20} />
      </div>

      {/* Cabeçalho atualizado */}
      <Header onCadastroClick={irParaCadastro} />

      {/* Seção com cachorros sem botões */}
      <DogSection onCadastroClick={irParaCadastro} showButtons={false} />

      {/* Seção de cards */}
      <CardsSection />

      {/* Quem somos */}
      <QuemSomos />

      {/* Carrossel de feedbacks */}
      <FeedbacksCarousel />

      {/* Rodapé */}
      <Footer />
    </div>
  );
}