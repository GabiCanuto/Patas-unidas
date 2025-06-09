import './home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';

import logo from '../../assets/logo.png';
import dogImage from '../../assets/dogHero.png';
import apadrinheIcon from '../../assets/icon-apadrinhe.png';
import adoteIcon from '../../assets/icon-adote.png';
import doacaoIcon from '../../assets/icon-doacao.png';
import patinha from '../../assets/patinha.png';
import mulherComCachorro from '../../assets/mulherComCachorro.png';
import card1 from '../../assets/card apolo.png';
import card2 from '../../assets/card bella.png';
import card3 from '../../assets/card luna.png';
import card4 from '../../assets/card millo.png';
import card5 from '../../assets/card thor.png';
import card6 from '../../assets/card zeus.png';
import footerImg from '../../assets/footer.png';

import PatasAleatorias from '../../components/patinhas/patasAleatorias';

export default function HomeUsuario() {
  const navigate = useNavigate();

  const irParaCadastro = () => {
    navigate('/cadastro');
  };

  return (
    // Adicionamos estilo inline para garantir posição relativa e altura mínima
    <div className="home-container" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Patinhas animadas em background */}
      <PatasAleatorias quantidade={15} />

      <div className="patinhas-decorativas">
        {[...Array(5)].map((_, i) => (
          <img key={i} src={patinha} alt="Patinha" className="patinha" />
        ))}
      </div>

      <nav className="navbar">
        <div className="logo">
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
          <h1>Transforme amor em ação:</h1>
          <p>adote, doe, salve uma vida.</p>
          <div className="buttons">
            <button onClick={irParaCadastro}>Cadastrar</button>
            <button>Sobre nós</button>
          </div>
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
          <p>Nos ajude fazendo uma doação!</p>
          <div className="card-text-hover">Sua contribuição muda vidas e transforma realidades.</div>
        </div>
      </section>

      <section className="quem-somos-section">
        <div className="quem-somos-content">
          <div className="quem-somos-img">
            <img src={mulherComCachorro} alt="Mulher com cachorro" />
          </div>
          <div className="quem-somos-texto">
            <h2>Porque Adotar?</h2>
            <p>
              Adotar um cachorro é dar uma segunda chance a um amigo que só quer oferecer amor.
              Ele retribui com carinho e gratidão, trazendo alegria e companheirismo.
              Ao adotar, você salva uma vida e ganha um companheiro fiel que estará ao seu lado
              nos melhores e piores momentos, sempre com um amor puro e incondicional.
            </p>
          </div>
        </div>
      </section>

      <section className="carrossel-cards-section">
        <h2 className="titulo-carrossel">Nossos Filhotes</h2>

        <div className="meu-carrossel">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Pagination]}
          >
            {[card1, card2, card3, card4, card5, card6].map((img, index) => (
              <SwiperSlide key={index}>
                <div className="card">
                  <img src={img} alt={`Card ${index + 1}`} className="card-img" />
                  <div className="card-text-hover">
                    Conheça nosso filhote número {index + 1}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="cta-carrossel">
          <p>Se cadastre e faça parte da nossa história</p>
          <button onClick={irParaCadastro}>Cadastrar</button>
        </div>
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
