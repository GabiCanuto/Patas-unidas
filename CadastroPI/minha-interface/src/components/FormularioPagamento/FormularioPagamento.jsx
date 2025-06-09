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

const FormularioPagamento = () => {
  const [metodoSelecionado, setMetodoSelecionado] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [chavePix, setChavePix] = useState("");
  const [tempoRestante, setTempoRestante] = useState(300);
  const [cronometroZerado, setCronometroZerado] = useState(false);
  const [salvarMetodo, setSalvarMetodo] = useState(false);
  const timerRef = useRef(null);

  const opcoes = [
    { id: "pix", label: "Pix", icon: <PiPixLogoLight /> },
    { id: "debito", label: "Cartão de débito", icon: <BsCreditCard2FrontFill /> },
    { id: "credito", label: "Cartão de crédito", icon: <BsCreditCard2FrontFill /> },
  ];

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
    } else {
      setMetodoSelecionado(id);
      clearInterval(timerRef.current);
      setCronometroZerado(false);
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

  return (
    <div className="formulario-pagamento">
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
          <form>
            <div className="form-group numero-cartao">
              <label>Número do cartão</label>
              <input type="text" placeholder="0000 0000 0000 0000" maxLength={19} />
            </div>

            <div className="form-row">
              <div className="form-group pequeno">
                <label>Data de vencimento</label>
                <input type="text" placeholder="MM/AA" maxLength={5} />
              </div>
              <div className="form-group pequeno">
                <label>CVC</label>
                <input type="password" placeholder="123" maxLength={4} />
              </div>
            </div>

            {/* Nome no cartão ocupa toda largura */}
            <div className="form-group">
              <label>Nome no cartão</label>
              <input type="text" placeholder="Nome completo" />
            </div>

            {/* País ocupa toda largura */}
            <div className="form-group pais-container">
              <label>
                <FaGlobeAmericas style={{ marginRight: 6 }} />
                País
              </label>
              <select>
                <option>Brasil</option>
                <option>Estados Unidos</option>
                <option>Portugal</option>
                <option>Outro</option>
              </select>
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

            <div className="resumo-doacao">
              Doação: <span>R$ 5,00</span>
            </div>

            <div className="total-pagamento">
              <span>Total a pagar:</span>
              <strong>R$ 150,00</strong>
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