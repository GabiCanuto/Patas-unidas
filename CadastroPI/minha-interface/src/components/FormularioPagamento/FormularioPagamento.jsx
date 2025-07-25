import React, { useState, useEffect, useRef } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { PiPixLogoLight } from "react-icons/pi";
import { FaGlobeAmericas } from "react-icons/fa";
import "./FormularioPagamento.css";

const gerarQRCodeFake = () => {
  return `https://pix.example.com/qrcode/${Math.random().toString(36).substring(2, 15)}`;
};

const gerarChavePixFake = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    "-" +
    Math.random().toString(36).substring(2, 15)
  );
};

const FormularioPagamento = ({
  valorApadrinhamento = 0,
  onContinuar,
  onFalha,
  tipo = "doacao", // Valor padrão é "doacao"
}) => {
  const [metodoSelecionado, setMetodoSelecionado] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [chavePix, setChavePix] = useState("");
  const [tempoRestante, setTempoRestante] = useState(300);
  const [cronometroZerado, setCronometroZerado] = useState(false);
  const [salvarMetodo, setSalvarMetodo] = useState(false);
  const [erros, setErros] = useState({});
  const timerRef = useRef(null);

  const [numeroCartao, setNumeroCartao] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [cvc, setCvc] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [pais, setPais] = useState("Brasil");

  const opcoes = [
    { id: "pix", label: "Pix", icon: <PiPixLogoLight /> },
    { id: "debito", label: "Cartão de débito", icon: <BsCreditCard2FrontFill /> },
    { id: "credito", label: "Cartão de crédito", icon: <BsCreditCard2FrontFill /> },
  ];

  // Função para formatar valor em moeda brasileira com segurança
  const formatarValorEmReais = (valor) => {
    const numero = Number(valor);
    if (isNaN(numero) || numero <= 0) {
      return "R$ 0,00";
    }
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const gerarNovoQRCodeEChave = () => {
    setQrCode(gerarQRCodeFake());
    setChavePix(gerarChavePixFake());
    setTempoRestante(300);
    setCronometroZerado(false);
  };

  const selecionarMetodo = (id) => {
    if (metodoSelecionado === id) {
      setMetodoSelecionado("");
      clearInterval(timerRef.current);
      setCronometroZerado(false);
      setErros({});
    } else {
      setMetodoSelecionado(id);
      clearInterval(timerRef.current);
      setCronometroZerado(false);
      setErros({});
      if (id === "pix") {
        gerarNovoQRCodeEChave();
      }
    }
  };

  useEffect(() => {
    if (metodoSelecionado === "pix") {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTempoRestante((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setCronometroZerado(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [metodoSelecionado, cronometroZerado]);

  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60).toString().padStart(2, "0");
    const seg = (segundos % 60).toString().padStart(2, "0");
    return `${min}:${seg}`;
  };

  const copiarChavePix = () => {
    navigator.clipboard.writeText(chavePix);
    alert("Chave Pix copiada!");
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (metodoSelecionado === "debito" || metodoSelecionado === "credito") {
      if (!numeroCartao.trim()) novosErros.numeroCartao = "Número do cartão é obrigatório";
      if (!dataVencimento.trim()) novosErros.dataVencimento = "Data de vencimento é obrigatória";
      if (!cvc.trim()) novosErros.cvc = "CVC é obrigatório";
      if (!nomeCartao.trim()) novosErros.nomeCartao = "Nome no cartão é obrigatório";
      if (!pais.trim()) novosErros.pais = "País é obrigatório";
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return; // Não prossegue se houver erros
    }

    // Simulação de sucesso ou falha no pagamento (substitua pela lógica real)
    const pagamentoBemSucedido = Math.random() < 0.5;
    if (pagamentoBemSucedido) {
      onContinuar();
    } else {
      onFalha();
    }
  };

  useEffect(() => {
    // Adicione este console.log para verificar o valor recebido
    console.log("Valor recebido no FormularioPagamento:", valorApadrinhamento);
  }, [valorApadrinhamento]);

  return (
    <div
      className="formulario-pagamento"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "600px",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <div className="opcoes-pagamento">
        {opcoes.map((opcao) => (
          <div
            key={opcao.id}
            className={`opcao-pagamento ${
              metodoSelecionado === opcao.id ? "selecionado" : ""
            }`}
            onClick={() => selecionarMetodo(opcao.id)}
          >
            {opcao.icon}
            <span>{opcao.label}</span>
          </div>
        ))}
      </div>

      {/* Conteúdo Pix */}
      {metodoSelecionado === "pix" && (
        <div className="pix-info">
          <h3>Escaneie o QR Code para pagar</h3>
          <div className="chave-pix-container">
            <input type="text" readOnly value={chavePix} />
            <button onClick={copiarChavePix}>Copiar chave Pix</button>
          </div>
          <div className="qrcode-container">
            {cronometroZerado ? (
              <div
                className="recarregar-container"
                onClick={gerarNovoQRCodeEChave}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") gerarNovoQRCodeEChave();
                }}
                aria-label="Gerar novo QR Code"
              >
                <FiRefreshCw
                  size={48}
                  color="#7e3ff2"
                  className="icone-recarregar"
                />
                <span className="texto-recarregar">
                  Clique para gerar novo QR Code
                </span>
              </div>
            ) : (
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                  qrCode
                )}`}
                alt="QR Code Pix"
              />
            )}
          </div>
          {!cronometroZerado && (
            <p>Tempo restante para o QR Code expirar: {formatarTempo(tempoRestante)}</p>
          )}
        </div>
      )}

      {/* Formulário Cartão de Débito e Crédito */}
      {(metodoSelecionado === "debito" || metodoSelecionado === "credito") && (
        <div className="metodo-info">
          <h3>
            <BsCreditCard2FrontFill style={{ marginRight: 8 }} />
            {metodoSelecionado === "debito"
              ? "Pagamento com Cartão de Débito"
              : "Pagamento com Cartão de Crédito"}
          </h3>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group numero-cartao">
              <label>Número do cartão</label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                value={numeroCartao}
                onChange={(e) => setNumeroCartao(e.target.value)}
                className={erros.numeroCartao ? "input-erro" : ""}
              />
              {erros.numeroCartao && <span className="erro-texto">{erros.numeroCartao}</span>}
            </div>

            <div className="form-row">
              <div className="form-group pequeno">
                <label>Data de vencimento</label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  maxLength={5}
                  value={dataVencimento}
                  onChange={(e) => setDataVencimento(e.target.value)}
                  className={erros.dataVencimento ? "input-erro" : ""}
                />
                {erros.dataVencimento && <span className="erro-texto">{erros.dataVencimento}</span>}
              </div>
              <div className="form-group pequeno">
                <label>CVC</label>
                <input
                  type="password"
                  placeholder="123"
                  maxLength={4}
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className={erros.cvc ? "input-erro" : ""}
                />
                {erros.cvc && <span className="erro-texto">{erros.cvc}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Nome no cartão</label>
              <input
                type="text"
                placeholder="Nome completo"
                value={nomeCartao}
                onChange={(e) => setNomeCartao(e.target.value)}
                className={erros.nomeCartao ? "input-erro" : ""}
              />
              {erros.nomeCartao && <span className="erro-texto">{erros.nomeCartao}</span>}
            </div>

            <div className="form-group pais-container">
              <label>
                <FaGlobeAmericas style={{ marginRight: 6 }} />
                País
              </label>
              <select
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                className={erros.pais ? "input-erro" : ""}
              >
                <option>Brasil</option>
                <option>Estados Unidos</option>
                <option>Portugal</option>
                <option>Outro</option>
              </select>
              {erros.pais && <span className="erro-texto">{erros.pais}</span>}
            </div>

            <div className="checkbox-discreto">
              <input
                type="checkbox"
                id="salvarMetodo"
                checked={salvarMetodo}
                onChange={() => setSalvarMetodo(!salvarMetodo)}
              />
              <label htmlFor="salvarMetodo">Salvar método de pagamento</label>
            </div>

            {/* Exibição do valor formatado */}
            <div className="resumo-doacao">
              {tipo === "apadrinhamento" ? (
                "Valor de Apadrinhamento:"
              ) : (
                "Doação:"
              )}{" "}
              <span>{formatarValorEmReais(valorApadrinhamento)}</span>
            </div>

            <div className="total-pagamento">
              <span>Total a pagar:</span>
              <strong>{formatarValorEmReais(valorApadrinhamento)}</strong>
            </div>

            <button type="submit" className="btn-finalizar">
              Finalizar pagamento
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FormularioPagamento;