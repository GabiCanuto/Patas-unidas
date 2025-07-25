import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userDatabase from "../../Data/userDataBase"; // ajuste o caminho conforme seu projeto
import "./style.css";
import dogImg from "../../assets/cachorro.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const clearMessages = () => {
    if (errorMessage || successMessage) {
      setErrorMessage("");
      setSuccessMessage("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Por favor, digite seu e-mail.");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Por favor, digite um e-mail válido.");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Por favor, digite sua senha.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("A senha deve ter pelo menos 6 caracteres.");
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((r) => setTimeout(r, 1000));

      const result = userDatabase.validateLogin(email.trim().toLowerCase(), password);

      if (result.success) {
        setSuccessMessage("Login realizado com sucesso!");

        localStorage.setItem("currentUser", JSON.stringify(result.user));
        localStorage.setItem("isLoggedIn", "true");

        setTimeout(() => {
          if (result.user.role === "admin") {
            navigate("/home-adm", { replace: true });
          } else {
            navigate("/home", { replace: true }); // redireciona usuário comum para /home
          }
        }, 1500);
      } else {
        setErrorMessage(result.message);
      }
    } catch (err) {
      console.error("💥 Erro no login:", err);
      setErrorMessage("Erro interno. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="left">
        <img src={dogImg} alt="Cachorrinho fofo" className="dog-image" />
      </div>

      <div className="right">
        <form onSubmit={handleLogin}>
          <h2>Bem-vindo de volta!</h2>

          {successMessage && (
            <div
              className="success-msg"
              style={{
                color: "#28a745",
                backgroundColor: "#d4edda",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "15px",
                border: "1px solid #c3e6cb",
              }}
            >
              ✅ {successMessage}
            </div>
          )}

          {errorMessage && (
            <div
              className="error-msg"
              style={{
                color: "#dc3545",
                backgroundColor: "#f8d7da",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "15px",
                border: "1px solid #f5c6cb",
              }}
            >
              ❌ {errorMessage}
            </div>
          )}

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearMessages();
              }}
              required
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearMessages();
              }}
              required
              disabled={isLoading}
              autoComplete="current-password"
              minLength="6"
            />
          </div>

          <div className="forgot-password">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Funcionalidade em desenvolvimento! 🚧");
              }}
            >
              Esqueci minha senha
            </a>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </button>

          <div className="register-link">
            <p>
              Não tem conta?
              <a
                href="/register"
                style={{
                  color: "#7C428F",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  marginLeft: "5px",
                }}
              >
                Cadastre-se aqui
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}