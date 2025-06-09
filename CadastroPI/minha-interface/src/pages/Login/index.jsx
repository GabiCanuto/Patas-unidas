import React, { useState } from "react";
import "./style.css";
import dogImg from "../../assets/cachorro.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Usuário encontrado!");
        setErrorMessage("");
        localStorage.setItem("token", data.token);
      } else {
        setErrorMessage(data.msg || "Erro ao fazer login");
        setSuccessMessage("");
      }
    } catch (err) {
      console.error("Erro na conexão com o servidor:", err);
      setErrorMessage("Erro na conexão com o servidor");
      setSuccessMessage("");
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

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-password">
            <a href="#">Esqueci minha senha</a>
          </div>

          <button type="submit">Entrar</button>

          {successMessage && (
            <p className="success-msg">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="error-msg">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
