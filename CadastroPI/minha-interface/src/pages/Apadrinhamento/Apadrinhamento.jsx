import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import Stepper from "../../components/Stepper/Stepper";
import PatasAleatorias from "../../components/patinhas/patasAleatorias";
import FormularioPagamento from "../../components/FormularioPagamento/FormularioPagamento";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./Apadrinhamento.css";

export default function Apadrinhamento() {
  const location = useLocation();
  const navigate = useNavigate();

  const cachorroSelecionado = location.state?.cachorroSelecionado || null;

  const [currentStep, setCurrentStep] = useState(0);
  const [pagamentoSucesso, setPagamentoSucesso] = useState(null);
  const steps = ["Apadrinhamento", "Pagamento", "Confirmação"];

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handlePagamentoResultado = (sucesso) => {
    setPagamentoSucesso(sucesso);
    setCurrentStep(2);
  };

  const handleVoltarConfirmacao = () => {
    setCurrentStep(1);
  };

  if (!cachorroSelecionado) {
    return (
      <>
        <Header />
        <main style={{ padding: "2rem", textAlign: "center" }}>
          <p>Nenhum cachorro selecionado. Volte para a vitrine.</p>
          <button onClick={() => navigate("/vitrine")}>Voltar para Vitrine</button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <div className="apadrinhamento-wrapper">
      <Header />

      <div className="apadrinhamento-patinhas-background">
        <PatasAleatorias quantidade={20} />
      </div>

      <main className="apadrinhamento-conteudo" style={{ paddingTop: "80px" }}>
        {/* paddingTop para evitar sobreposição do Header, ajuste conforme altura do Header */}

        <div className={`apadrinhamento-conteudo-entre-header-footer apadrinhamento-step${currentStep}`}>
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />

          {currentStep === 0 && (
            <div className="apadrinhamento-step0-container">
              <div className="card-imagem-cachorro">
                <img
                  src={cachorroSelecionado.img}
                  alt={cachorroSelecionado.nome}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/imagem-padrao.png";
                  }}
                />
                <div className="nome-cachorro">{cachorroSelecionado.nome}</div>
              </div>

              <div className="apadrinhamento-card-info">
                <h2>{cachorroSelecionado.nome}</h2>
                <p>{cachorroSelecionado.resumo || (
                  <>
                    Sexo: {cachorroSelecionado.sexo} <br />
                    Porte: {cachorroSelecionado.porte} <br />
                    Idade: {cachorroSelecionado.idade} <br />
                    Cor: {cachorroSelecionado.cor} <br />
                    Comportamento: {cachorroSelecionado.comportamento}
                  </>
                )}</p>

                <div className="apadrinhamento-botoes">
                  <button
                    className="apadrinhamento-btn-apadrinhar"
                    onClick={() => setCurrentStep(1)}
                  >
                    Apadrinhar
                  </button>
                  <button
                    className="apadrinhamento-btn-adotar"
                    onClick={() => alert("Função de adoção ainda não implementada")}
                  >
                    Adotar
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="apadrinhamento-card-info">
              <FormularioPagamento
                onVoltar={() => setCurrentStep(0)}
                onContinuar={() => handlePagamentoResultado(true)}
                onFalha={() => handlePagamentoResultado(false)}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="apadrinhamento-etapa-confirmacao card-confirmacao">
              {pagamentoSucesso ? (
                <>
                  <FaCheckCircle size={100} color="#4BB543" />
                  <h2>Pagamento realizado com sucesso!</h2>
                  <p>Obrigado por seu apadrinhamento! Sua ajuda faz toda a diferença.</p>
                </>
              ) : (
                <>
                  <FaTimesCircle size={100} color="#FF4C4C" />
                  <h2>Pagamento falhou</h2>
                  <p>Houve um problema ao processar seu pagamento. Por favor, tente novamente.</p>
                </>
              )}
              <button className="apadrinhamento-btn-voltar" onClick={handleVoltarConfirmacao}>
                Voltar
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}