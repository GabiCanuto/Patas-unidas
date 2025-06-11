import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import Stepper from "../../components/Stepper/Stepper";
import PatasAleatorias from "../../components/patinhas/patasAleatorias";
import FormularioPagamento from "../../components/FormularioPagamento/FormularioPagamento";
import "./doacao.css";
import vitrine from "../Vitrine/Vitrine";

import imgCachorros from "../../assets/cachorro-doacao.png";

export default function Doacao() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Doação", "Apadrinhamento", "Pagamento", "Confirmação"];
  const navigate = useNavigate();

  // Função para atualizar o passo ao clicar no Stepper
  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="pagamento-wrapper">
      <div className="patinhas-background">
        <PatasAleatorias quantidade={20} />
      </div>

      <div className="pagamento-conteudo">
        <Header />

        <div className={`conteudo-entre-header-footer doacao-section step-${currentStep}`}>
          <div className="form-doacao-container">
            {/* Passa a função handleStepClick para o Stepper */}
            <Stepper steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />

            {currentStep === 0 && (
              <>
                <h2 className="titulo-doacao">Faça sua doação</h2>
                <input
                  type="number"
                  placeholder="Insira um valor"
                  min="5.00"
                  step="0.01"
                  className="input-doacao"
                />
                <p className="valor-min">Valor mínimo: R$5,00</p>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
                  <button
                    className="btn-opcao btn-continuar"
                    onClick={() => setCurrentStep(1)}
                  >
                    Continuar
                  </button>
                </div>
              </>
            )}

            {currentStep === 1 && (
              <>
                <div className="etapa-pagamento etapa-1">
                  <h2>Gostaria de apadrinhar algum animal?</h2>
                  <p>
                    Ao apadrinhar, você contribui mensalmente para o bem-estar de um animal
                    resgatado, ajudando com alimentação, vacinas e muito amor. É uma forma
                    especial de criar um laço com um pet em recuperação.
                  </p>
                </div>

                <div className="botoes-apadrinhamento">
                  <button
                    className="btn-voltar"
                    onClick={() => setCurrentStep(0)}
                  >
                    Voltar
                  </button>
                  <button
                    className="btn-opcao"
                    onClick={() => navigate("/vitrine")}
                  >
                    Sim
                  </button>
                  <button
                    className="btn-opcao"
                    onClick={() => setCurrentStep(2)}
                  >
                    Não
                  </button>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <FormularioPagamento
                onVoltar={() => setCurrentStep(1)}
                onContinuar={() => setCurrentStep(3)}
              />
            )}

            {currentStep === 3 && (
              <div className="etapa-confirmacao">
                <h2>Confirmação</h2>
                <p>Obrigado por sua doação e interesse! Sua ajuda faz toda a diferença.</p>
                <button className="btn-voltar" onClick={() => setCurrentStep(2)}>
                  Voltar
                </button>
              </div>
            )}
          </div>

          {currentStep === 0 && (
            <div className="info-doacao-container">
              <h3>Como sua doação ajuda nossos pets?</h3>
              <p>
                Sua doação é essencial para cuidar dos nossos amigos de quatro patas. Com ela,
                conseguimos oferecer alimentação, vacinas, castração e um ambiente seguro cheio de
                carinho. Cada valor contribui para salvar vidas, proporcionando saúde e esperança
                para os animais que tanto precisam.
              </p>
              <div className="img-wrapper">
                <div className="overlay"></div>
                <img src={imgCachorros} alt="Grupo de cachorros" className="img-cachorros" />
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}