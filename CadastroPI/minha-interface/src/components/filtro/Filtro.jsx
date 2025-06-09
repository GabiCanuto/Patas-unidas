import React from "react";
import './Filtro.css'

export default function Filtro({ filtros, atualizarFiltro }) {
  return (
    <div className="filtros-container">
      <select
        value={filtros.sexo}
        onChange={e => atualizarFiltro('sexo', e.target.value)}
      >
        <option value="">Sexo (Todos)</option>
        <option value="M">Macho</option>
        <option value="F">Fêmea</option>
      </select>

      <select
        value={filtros.porte}
        onChange={e => atualizarFiltro('porte', e.target.value)}
      >
        <option value="">Porte (Todos)</option>
        <option value="Pequeno">Pequeno</option>
        <option value="Médio">Médio</option>
        <option value="Grande">Grande</option>
      </select>

      <select
        value={filtros.idade}
        onChange={e => atualizarFiltro('idade', e.target.value)}
      >
        <option value="">Idade (Todos)</option>
        <option value="Filhote">Filhote</option>
        <option value="Adulto">Adulto</option>
        <option value="Idoso">Idoso</option>
      </select>

      <select
        value={filtros.cor}
        onChange={e => atualizarFiltro('cor', e.target.value)}
      >
        <option value="">Cor (Todas)</option>
        <option value="Preto">Preto</option>
        <option value="Marrom">Marrom</option>
        <option value="Branco">Branco</option>
      </select>
    </div>
  );
}
