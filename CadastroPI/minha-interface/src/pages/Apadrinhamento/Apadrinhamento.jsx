import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import Stepper from "../../components/Stepper/Stepper";
import PatasAleatorias from "../../components/patinhas/patasAleatorias";
import FormularioPagamento from "../../components/FormularioPagamento/FormularioPagamento";
import { FaCheckCircle, FaTimes, FaHeart, FaDog, FaArrowLeft } from "react-icons/fa";
import Confetti from "react-confetti";
import "./Apadrinhamento.css";

function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

export default function Apadrinhamento() {
  const location = useLocation();
  const navigate = useNavigate();

  const cachorroSelecionado = location.state?.cachorroSelecionado || null;

  const [currentStep, setCurrentStep] = useState(0);
  const [pagamentoSucesso, setPagamentoSucesso] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingPagamento, setLoadingPagamento] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { width, height } = useWindowSize();

  const steps = ["Apadrinhamento", "Pagamento", "Confirmação"];

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const validarPagamento = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  };

  const handlePagamentoResultado = async () => {
    setLoadingPagamento(true);
    const sucesso = await validarPagamento();
    setLoadingPagamento(false);
    setPagamentoSucesso(sucesso);
    setCurrentStep(2);

    if (sucesso) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 7000);
    }
  };

  const handleVoltarConfirmacao = () => {
    navigate('/vitrine');
  };

  if (!cachorroSelecionado) {
    return (
      <>
        <Header />
        <main style={{ padding: "2rem", textAlign: "center" }}>
          <p>Nenhum cachorro selecionado. Volte para a vitrine.</p>
          <button onClick={() => navigate("/vitrine")}>
            <FaArrowLeft style={{ marginRight: "8px" }} />
            Voltar para Vitrine
          </button>
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
        <div
          className={`apadrinhamento-conteudo-entre-header-footer apadrinhamento-step${currentStep}`}
        >
          <Stepper steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />

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
                <p>
                  {cachorroSelecionado.resumo || (
                    <>
                      Sexo: {cachorroSelecionado.sexo} <br />
                      Porte: {cachorroSelecionado.porte} <br />
                      Idade: {cachorroSelecionado.idade} <br />
                      Cor: {cachorroSelecionado.cor} <br />
                      Comportamento: {cachorroSelecionado.comportamento}
                    </>
                  )}
                </p>

                <div className="apadrinhamento-botoes">
                  <button className="apadrinhamento-btn-apadrinhar" onClick={() => setCurrentStep(1)}>
                    <FaHeart style={{ marginRight: "8px" }} />
                    Apadrinhar
                  </button>
                  <button
                    className="apadrinhamento-btn-adotar"
                    onClick={() => alert("Função de adoção ainda não implementada")}
                  >
                    <FaDog style={{ marginRight: "8px" }} />
                    Adotar
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="apadrinhamento-card-info">
              <h2>Apadrinhamento</h2>
              <h3>{cachorroSelecionado.nome}</h3>
              <p>Valor mensal: R$ {cachorroSelecionado.valorApadrinhamento},00</p>

              <FormularioPagamento
                valorApadrinhamento={cachorroSelecionado.valorApadrinhamento}
                onVoltar={() => setCurrentStep(0)}
                onContinuar={handlePagamentoResultado}
                disabled={loadingPagamento}
              />

              {loadingPagamento && (
                <p style={{ textAlign: "center", marginTop: "1rem" }}>
                  Validando pagamento, por favor aguarde...
                </p>
              )}

              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#7C428F",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "1rem",
                    padding: 0,
                  }}
                >
                  O que é apadrinhamento?
                </button>
              </div>

              {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>O que é Apadrinhamento?</h2>
                    <p>
                      Apadrinhar um pet significa oferecer suporte financeiro mensal para garantir
                      alimentação, cuidados veterinários e muito amor para o animal. É uma forma de
                      ajudar sem precisar levar o pet para casa, mas fazendo toda a diferença na
                      vida dele.
                    </p>
                    <button onClick={() => setShowModal(false)}>
                      <FaTimes style={{ marginRight: "6px" }} />
                      Fechar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <>
              {showConfetti && (
                <Confetti
                  width={width}
                  height={height}
                  recycle={false}
                  numberOfPieces={800}
                  gravity={0.3}
                  initialVelocityX={{ min: -10, max: 10 }}
                  initialVelocityY={{ min: -10, max: 0 }}
                />
              )}
              <div className="apadrinhamento-etapa-confirmacao card-confirmacao">
                <FaCheckCircle size={100} color="#4BB543" />
                <h2>Pagamento realizado com sucesso!</h2>
                <p>Obrigado por seu apadrinhamento! Sua ajuda faz toda a diferença.</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                  <button
                    className="apadrinhamento-btn-voltar"
                    onClick={handleVoltarConfirmacao}
                    disabled={loadingPagamento}
                    style={{ marginBottom: "0", width: "160px" }}
                  >
                    <FaArrowLeft style={{ marginRight: "8px" }} />
                    Voltar
                  </button>
                  <button
                    className="apadrinhamento-btn-visualizar"
                    onClick={() => {
                      navigate("/visualiza-apadrinhamento");
                    }}
                    style={{
                      backgroundColor: "#6D3A7E",
                      color: "white",
                      border: "none",
                      borderRadius: "25px",
                      padding: "0.8rem 2rem",
                      fontSize: "1.1rem",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      marginBottom: "0",
                      width: "250px",
                      height: "55px",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#431546")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6D3A7E")}
                  >
                    Apadrinhamentos
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}