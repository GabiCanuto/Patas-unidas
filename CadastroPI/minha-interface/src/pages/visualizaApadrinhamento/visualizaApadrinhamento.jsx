import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faArrowLeft, faBan } from '@fortawesome/free-solid-svg-icons';
import "./VisualizaApadrinhamento.css";

export default function VisualizaApadrinhamento() {
  const navigate = useNavigate();

  const dadosIniciais = [
    {
      id: 1,
      nomePet: "Luna",
      foto: "/assets/doguinho4.jpg",
      status: "Ativo",
      valorMensal: 50,
      dataInicio: "2024-01-15",
      descricao:
        "Luna é uma cachorrinha muito carinhosa e brincalhona. Ela adora passear e receber carinho.",
    },
    {
      id: 2,
      nomePet: "Thor",
      foto: "/assets/doguinho3.jpg",
      status: "Ativo",
      valorMensal: 60,
      dataInicio: "2023-11-20",
      descricao:
        "Thor adora correr e é muito protetor. Um companheiro fiel para todas as horas.",
    },
    {
      id: 3,
      nomePet: "Maya",
      foto: "/assets/doguinho14.jpg",
      status: "Ativo",
      valorMensal: 45,
      dataInicio: "2024-03-10",
      descricao:
        "Maya é uma cachorrinha alegre e cheia de energia, adora brincar com crianças.",
    },
  ];

  const [apadrinhamentos, setApadrinhamentos] = useState(dadosIniciais);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPetName, setPopupPetName] = useState("");
  const [apadrinhamentoParaCancelar, setApadrinhamentoParaCancelar] = useState(null);

  // Função para calcular a próxima data de apadrinhamento (próximo mês após hoje)
  const calcularProximoApadrinhamento = (dataInicio) => {
    const hoje = new Date();
    let data = new Date(dataInicio);

    // Avança a data até ser maior ou igual a hoje
    while (data < hoje) {
      data.setMonth(data.getMonth() + 1);
    }

    return data.toLocaleDateString("pt-BR");
  };

  // Abre modal de confirmação
  const abrirConfirmacaoCancelamento = (id, nomePet) => {
    setApadrinhamentoParaCancelar({ id, nomePet });
  };

  // Confirma cancelamento
  const confirmarCancelamento = () => {
    if (apadrinhamentoParaCancelar) {
      setApadrinhamentos((prev) =>
        prev.filter((a) => a.id !== apadrinhamentoParaCancelar.id)
      );
      setPopupPetName(apadrinhamentoParaCancelar.nomePet);
      setShowPopup(true);
      setApadrinhamentoParaCancelar(null);
    }
  };

  // Cancela confirmação
  const cancelarConfirmacao = () => {
    setApadrinhamentoParaCancelar(null);
  };

  // Fecha popup de agradecimento
  const fecharPopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="visualiza-apadrinhamento-wrapper">
      <Header />

      <main className="visualiza-apadrinhamento-main">
        <h1>Meus Apadrinhamentos</h1>

        {apadrinhamentos.length === 0 ? (
          <p className="nenhum-apadrinhamento">Você não possui apadrinhamentos ativos.</p>
        ) : (
          <div className="apadrinhamento-lista">
            {apadrinhamentos.map((apadrinhamento) => (
              <div key={apadrinhamento.id} className="apadrinhamento-card">
                <div className="apadrinhamento-card-left">
                  <img
                    src={apadrinhamento.foto}
                    alt={apadrinhamento.nomePet}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/imagem-padrao.png";
                    }}
                  />
                </div>

                <div className="apadrinhamento-card-right">
                  <h2>{apadrinhamento.nomePet}</h2>
                  <p className="descricao">{apadrinhamento.descricao}</p>

                  <div className="info-row">
                    <span className="label">Status:</span>
                    <span className="value status">{apadrinhamento.status}</span>
                  </div>

                  <div className="info-row">
                    <span className="label">Valor mensal:</span>
                    <span className="value">R$ {apadrinhamento.valorMensal},00</span>
                  </div>

                  <div className="info-row">
                    <span className="label">Início do apadrinhamento:</span>
                    <span className="value">
                      {new Date(apadrinhamento.dataInicio).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="label">Próximo pagamento:</span>
                    <span className="value">
                      {calcularProximoApadrinhamento(apadrinhamento.dataInicio)}
                    </span>
                  </div>

                  <button
                    className="btn-cancelar"
                    onClick={() =>
                      abrirConfirmacaoCancelamento(apadrinhamento.id, apadrinhamento.nomePet)
                    }
                    type="button"
                  >
                    <FontAwesomeIcon icon={faBan} />
                    Cancelar Apadrinhamento
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="btn-voltar" onClick={() => navigate('/vitrine')} type="button">
          <FontAwesomeIcon icon={faArrowLeft} />
          Voltar
        </button>
      </main>

      <Footer />

      {/* Modal de confirmação */}
      {apadrinhamentoParaCancelar && (
        <div className="popup-overlay" onClick={cancelarConfirmacao}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>
              Tem certeza que deseja cancelar o apadrinhamento de{" "}
              <strong>{apadrinhamentoParaCancelar.nomePet}</strong>?
            </h2>
            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <button
                className="btn-confirmar"
                onClick={confirmarCancelamento}
                type="button"
              >
                <FontAwesomeIcon icon={faCheck} />
                Sim
              </button>
              <button
                className="btn-cancelar"
                onClick={cancelarConfirmacao}
                type="button"
              >
                <FontAwesomeIcon icon={faTimes} />
                Não
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup de agradecimento */}
      {showPopup && (
        <div className="popup-overlay" onClick={fecharPopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Obrigado pelo seu carinho!</h2>
            <p>
              Agradecemos pelo tempo que você apadrinhou{" "}
              <strong>{popupPetName}</strong>. Seu apoio faz toda a diferença!
            </p>
            <button
              className="btn-fechar-popup"
              onClick={fecharPopup}
              type="button"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}