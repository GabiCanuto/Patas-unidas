import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/footer/Footer';
import './CadastroCachorro.css';
import iconCachorro from '../../assets/iconCachorro.png';

const racas = ['Vira-lata', 'Poodle', 'Labrador', 'Bulldog'];
const cores = ['Preto', 'Branco', 'Caramelo', 'Marrom', 'Cinza'];
const portes = ['Pequeno', 'Médio', 'Grande'];

export default function CadastroCachorro({ listaCachorros, adicionarCachorro }) {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [cor, setCor] = useState('');
  const [sexo, setSexo] = useState('');
  const [idade, setIdade] = useState('');
  const [valorApadrinhamento, setValorApadrinhamento] = useState('');
  const [porte, setPorte] = useState('');
  const [castrado, setCastrado] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoCachorro = {
      id: listaCachorros.length + 1,
      nome,
      raca,
      cor,
      sexo,
      idade,
      porte,
      castrado,
      img: preview || '/assets/doguinho-default.jpg',
      comportamento: descricao,
      resumo: `${nome} é um ${sexo === 'Macho' ? 'cão' : 'cadela'} de porte ${porte.toLowerCase()}, ${descricao.toLowerCase()}.`,
      valorApadrinhamento: valorApadrinhamento || (porte === 'Pequeno' ? 50 : porte === 'Médio' ? 65 : 85),
    };

    adicionarCachorro(novoCachorro);

    alert(`✅ Cachorro "${novoCachorro.nome}" cadastrado com sucesso!`);

    setNome('');
    setRaca('');
    setCor('');
    setSexo('');
    setIdade('');
    setValorApadrinhamento('');
    setPorte('');
    setCastrado('');
    setDescricao('');
    setFoto(null);
    setPreview(null);
  };

  return (
    <div className="cadastro-cachorro-container">
      <Header />

      <form className="cadastro-cachorro-form" onSubmit={handleSubmit}>
        <label htmlFor="foto" className="dog-icon-label" style={{ cursor: 'pointer' }}>
          {preview ? (
            <img src={preview} alt="Foto do cachorro" className="dog-icon" />
          ) : (
            <img src={iconCachorro} alt="Ícone cachorro" className="dog-icon" />
          )}
          <input
            id="foto"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFotoChange}
          />
        </label>
        <span className="dog-icon-text">Clique para adicionar foto</span>

        <h2>Cadastrar Cachorro</h2>
        <div className="cadastro-campos">
          <div className="campo">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite o nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="raca">Raça</label>
            <select
              id="raca"
              value={raca}
              onChange={e => setRaca(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              {racas.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="campo">
            <label htmlFor="cor">Cor</label>
            <select
              id="cor"
              value={cor}
              onChange={e => setCor(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              {cores.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="campo">
            <label htmlFor="porte">Porte</label>
            <select
              id="porte"
              value={porte}
              onChange={e => setPorte(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              {portes.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="campo idade-valor-container" style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="idade">Idade</label>
              <input
                id="idade"
                type="text"
                placeholder="Ex: 2 anos, 8 meses, Filhote, Adulto"
                value={idade}
                onChange={e => setIdade(e.target.value)}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="valorApadrinhamento">Valor Apadrinhamento (R$)</label>
              <input
                id="valorApadrinhamento"
                type="number"
                min="0"
                step="0.01"
                placeholder="Ex: 50.00"
                value={valorApadrinhamento}
                onChange={e => setValorApadrinhamento(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="campo">
            <label>Sexo</label>
            <div className="radio-group radio-group-grande">
              <label>
                <input
                  type="radio"
                  name="sexo"
                  value="Macho"
                  checked={sexo === 'Macho'}
                  onChange={e => setSexo(e.target.value)}
                  required
                />
                Macho
              </label>
              <label>
                <input
                  type="radio"
                  name="sexo"
                  value="Fêmea"
                  checked={sexo === 'Fêmea'}
                  onChange={e => setSexo(e.target.value)}
                  required
                />
                Fêmea
              </label>
            </div>
          </div>
          <div className="campo">
            <label>Castrado</label>
            <div className="radio-group radio-group-grande">
              <label>
                <input
                  type="radio"
                  name="castrado"
                  value="Sim"
                  checked={castrado === 'Sim'}
                  onChange={e => setCastrado(e.target.value)}
                  required
                />
                Sim
              </label>
              <label>
                <input
                  type="radio"
                  name="castrado"
                  value="Não"
                  checked={castrado === 'Não'}
                  onChange={e => setCastrado(e.target.value)}
                  required
                />
                Não
              </label>
            </div>
          </div>
          <div className="campo campo-descricao" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              placeholder="Descreva o comportamento e características do cachorro"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              rows={3}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn-cadastrar">Cadastrar</button>
      </form>

      <Footer />
    </div>
  );
}