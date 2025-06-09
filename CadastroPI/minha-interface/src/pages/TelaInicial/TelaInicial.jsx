import './TelaInicial.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';

import logo from '../../assets/logo.png'; 
import dogImage from '../../assets/dogHero.png'; 
import apadrinheIcon from '../../assets/icon-apadrinhe.png';
import adoteIcon from '../../assets/icon-adote.png';
import doacaoIcon from '../../assets/icon-doacao.png';
import patinha from '../../assets/patinha.png';
import mulherComCachorro from '../../assets/mulherComCachorro.png';

import footerImg from '../../assets/footer.png';

 // IMPORTAÇÃO ADICIONADA

export default function HomeAdm() {
  const navigate = useNavigate();

  const irParaCadastro = () => {
    navigate('/cadastro');
  };

  return (
    // ADICIONADO style para posição relativa e minHeight para as patinhas de background
    <div className="home-usuario-container" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Patinhas animadas em background */}
      <PatasAleatorias quantidade={15} />

      <div className="patinhas-decorativas">
        {[...Array(5)].map((_, i) => (
          <img key={i} src={patinha} alt="Patinha" className="patinha" />
        ))}
      </div>

      <nav className="navbar-usuario">
        <div className="logo-usuario">
          <img src={logo} alt="Logo Patas Unidas" />
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Vitrine</a>
          <a href="#">Doações</a>
          <a href="#" onClick={irParaCadastro}>Cadastro</a>
        </div>
      </nav>

      <section className="main-section">
        <div className="text-section">
          <h1>Olá amigo!
              Seja bem-vindo!</h1>
          <p>Estava esperando
por você.</p>
        </div>
        <div className="image-section">
          <img src={dogImage} alt="Cachorro feliz" />
        </div>
      </section>

      <section className="cards-section">
        <div className="card">
          <img src={apadrinheIcon} alt="Apadrinhe um animal" />
          <p>Apadrinhe um animal!</p>
          <div className="card-text-hover">Ajude um animalzinho dando carinho e apoio.</div>
        </div>
        <div className="card">
          <img src={adoteIcon} alt="Adote seu melhor amigo" />
          <p>Adote seu melhor amigo!</p>
          <div className="card-text-hover">Dê um lar cheio de amor para quem precisa.</div>
        </div>
        <div className="card">
          <img src={doacaoIcon} alt="Nos ajude fazendo uma doação" />
          <p>Doe e faça história!</p>
          <div className="card-text-hover">Sua contribuição muda vidas e transforma realidades.</div>
        </div>
      </section>

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

      <section className="feedbacks-section">
        <h2 className="feedbacks-title">Feedbacks!</h2>
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="feedbacks-swiper"
        >
          {[
            "Adotar um cachorro da UPA foi uma das melhores decisões que tomei. Além de terem me ajudado a encontrar um novo amigo, me deram todo o suporte necessário para o processo de adaptação. Hoje, meu cãozinho é parte da família!",
            "Saber que minha doação está ajudando animais em necessidade me dá uma sensação de propósito. É gratificante ver o impacto que todos nós podemos ter.",
            "Nunca imaginei que um gesto tão simples pudesse transformar tanto minha vida. Obrigado, UPA!"
          ].map((texto, index) => (
            <SwiperSlide key={index}>
              <div className="feedback-item">
                <p>"{texto}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <footer className="footer">
        <img src={footerImg} alt="Footer waves" className="footer-wave" />
        <div className="footer-content">
          <h3 className="footer-title">Nossos contatos</h3>
          <div className="footer-icons">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram color="#fff" size={24} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF color="#fff" size={24} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <FaTwitter color="#fff" size={24} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp color="#fff" size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
