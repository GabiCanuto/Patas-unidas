import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './feedbacks.css'

const feedbacks = [
  "Adotar um cachorro da UPA foi uma das melhores decisões que tomei. Além de terem me ajudado a encontrar um novo amigo, me deram todo o suporte necessário para o processo de adaptação. Hoje, meu cãozinho é parte da família!",
  "Saber que minha doação está ajudando animais em necessidade me dá uma sensação de propósito. É gratificante ver o impacto que todos nós podemos ter.",
  "Nunca imaginei que um gesto tão simples pudesse transformar tanto minha vida. Obrigado, UPA!"
];

const FeedbacksCarousel = () => {
  return (
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
        {feedbacks.map((texto, index) => (
          <SwiperSlide key={index}>
            <div className="feedback-item">
              <p>"{texto}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeedbacksCarousel;