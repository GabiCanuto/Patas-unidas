import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import Stepper from "../../components/Stepper/Stepper";
import PatasAleatorias from "../../components/patinhas/patasAleatorias";
import FormularioPagamento from "../../components/FormularioPagamento/FormularioPagamento";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import imgCachorros from "../../assets/cachorro-doacao.png";
import "./doacao.css";

export default function Doacao() {
  const location = useLocation();
  const navigate = useNavigate();

  const cachorroSelecionado = location.state?.cachorroSelecionado || null;

  const [currentStep, setCurrentStep] = useState(0);
  const [pagamentoSucesso, setPagamentoSucesso] = useState(null);
  const [valorDoacao, setValorDoacao] = useState(""); // Estado para o valor da doação

  const steps = ["Doação", "Apadrinhamento", "Pagamento", "Confirmação"];

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handlePagamentoResultado = (sucesso) => {
    setPagamentoSucesso(sucesso);
    setCurrentStep(3);
  };

  const handleVoltarConfirmacao = () => {
    setCurrentStep(2);
  };

  // Função para validar valor mínimo antes de avançar
  const handleContinuar = () => {
    const valor = parseFloat(valorDoacao);
    if (isNaN(valor) || valor < 5) {
      alert("Por favor, insira um valor mínimo de R$ 5,00");
      return;
    }
    setCurrentStep(1);
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
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />

            {currentStep === 0 && (
              <>
                <h2 className="titulo-doacao">Faça sua doação</h2>

                {cachorroSelecionado && (
                  <div className="cachorro-imagem-container" style={{ marginBottom: "1rem" }}>
                    <img
                      src={cachorroSelecionado.imagem}
                      alt={cachorroSelecionado.nome}
                      style={{
                        width: "100%",
                        maxHeight: "400px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                  </div>
                )}

                <input
                  type="number"
                  placeholder="Insira um valor"
                  min="5.00"
                  step="0.01"
                  className="input-doacao"
                  value={valorDoacao}
                  onChange={(e) => setValorDoacao(e.target.value)}
                />
                <p className="valor-min">Valor mínimo: R$5,00</p>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
                  <button className="btn-opcao btn-continuar" onClick={handleContinuar}>
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
                  <button className="btn-voltar" onClick={() => setCurrentStep(0)}>
                    Voltar
                  </button>
                  <button className="btn-opcao" onClick={() => navigate("/vitrine")}>
                    Sim
                  </button>
                  <button className="btn-opcao" onClick={() => setCurrentStep(2)}>
                    Não
                  </button>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                {/* Adicione este console.log para verificar o valor antes de passar */}
                {console.log("Valor da doação sendo passado:", parseFloat(valorDoacao) || 0)}
                <FormularioPagamento
                  valorApadrinhamento={parseFloat(valorDoacao) || 0} // Passa o valor para o formulário
                  onVoltar={() => setCurrentStep(1)}
                  onContinuar={() => handlePagamentoResultado(true)}
                  onFalha={() => handlePagamentoResultado(false)}
                />
              </>
            )}

            {currentStep === 3 && (
              <div className="etapa-confirmacao card-confirmacao">
                {pagamentoSucesso ? (
                  <>
                    <FaCheckCircle size={100} color="#4BB543" />
                    <h2>Pagamento realizado com sucesso!</h2>
                    <p>Obrigado por sua doação e interesse! Sua ajuda faz toda a diferença.</p>
                  </>
                ) : (
                  <>
                    <FaTimesCircle size={100} color="#FF4C4C" />
                    <h2>Pagamento falhou</h2>
                    <p>Houve um problema ao processar seu pagamento. Por favor, tente novamente.</p>
                  </>
                )}
                <button className="btn-voltar" onClick={handleVoltarConfirmacao}>
                  Voltar
                </button>
              </div>
            )}
          </div>

          {currentStep === 0 && !cachorroSelecionado && (
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