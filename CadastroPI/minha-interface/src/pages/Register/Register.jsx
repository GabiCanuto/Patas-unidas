import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { subYears } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import "react-datepicker/dist/react-datepicker.css";
import "./FormPage.css";
import dogImg from "../../assets/cachorro.png";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    socialName: "",
    cpf: "",
    birthDate: null,
    email: "",
    numberPhone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      birthDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const payload = {
      ...formData,
      birthDate: formData.birthDate?.toISOString().split("T")[0],
    };

    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        setFormData({
          name: "",
          lastName: "",
          socialName: "",
          cpf: "",
          birthDate: null,
          email: "",
          numberPhone: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        alert(data.erro || "Erro ao cadastrar.");
      }
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  const maxDate = subYears(new Date(), 18);

  return (
    <div className="register-container">
      <div className="left">
        <img src={dogImg} alt="Cachorrinho fofo" className="dog-image" />
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <h2>Faça seu cadastro!</h2>
          <div className="row">
            <div className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                name="name"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Sobrenome:</label>
              <input
                type="text"
                name="lastName"
                placeholder="Digite seu sobrenome"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Nome Social (opcional):</label>
            <input
              type="text"
              name="socialName"
              placeholder="Digite seu nome social"
              value={formData.socialName}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <div className="form-group">
              <label>CPF:</label>
              <input
                type="text"
                name="cpf"
                placeholder="Digite seu CPF"
                value={formData.cpf}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Data de nascimento:</label>
              <DatePicker
                selected={formData.birthDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                maxDate={maxDate}
                placeholderText="dd/mm/aaaa"
                locale={ptBR}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                className="custom-datepicker"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Número de telefone:</label>
            <input
              type="text"
              name="numberPhone"
              placeholder="Digite seu telefone"
              value={formData.numberPhone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row">
            <div className="form-group">
              <label>Senha:</label>
              <input
                type="password"
                name="password"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirme sua senha:</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirme a senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <p className="login-link">
            Já possui uma conta? <a href="/login">Faça login</a>
          </p>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
