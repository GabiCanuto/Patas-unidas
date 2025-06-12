import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import Header from '../../components/Header/Header';
import PatasAleatorias from '../../components/patinhas/patasAleatorias';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filtro from '../../components/filtro/Filtro';
import CardVitrine from '../../components/CardVitrine/CardVitrine';
import Footer from '../../components/footer/Footer';

import './Vitrine.css';

import cachorros from '../../Data/cachorro';

export default function Apadrinhamento() {
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    sexo: '',
    porte: '',
    idade: '',
    cor: '',
  });
  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);

  const itensPorPagina = 12;

  const atualizarFiltro = useCallback((campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor,
    }));
    setPaginaAtual(1);
  }, []);

  const dadosFiltrados = cachorros.filter(item => {
    const correspondeSexo = filtros.sexo ? item.sexo === filtros.sexo : true;
    const correspondePorte = filtros.porte ? item.porte === filtros.porte : true;
    const correspondeIdade = filtros.idade ? String(item.idade) === String(filtros.idade) : true;
    const correspondeCor = filtros.cor ? item.cor === filtros.cor : true;
    const correspondeBusca = item.nome?.toLowerCase().includes(busca.toLowerCase());

    return (
      correspondeSexo &&
      correspondePorte &&
      correspondeIdade &&
      correspondeCor &&
      correspondeBusca
    );
  });

  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const dadosPaginados = dadosFiltrados.slice(indiceInicial, indiceFinal);

  const paginaAnterior = useCallback(() => {
    setPaginaAtual(prev => Math.max(prev - 1, 1));
  }, []);

  const proximaPagina = useCallback(() => {
    setPaginaAtual(prev => Math.min(prev + 1, totalPaginas));
  }, [totalPaginas]);

  const handleCardClick = useCallback((cachorro) => {
    navigate('/apadrinhamento', { state: { cachorroSelecionado: cachorro } });
  }, [navigate]);

  return (
    <>
      <PatasAleatorias />
      <div className="vitrine-content">
        <Header />
        <SearchBar
          placeholder="Pesquisar"
          onChange={e => setBusca(e.target.value)}
          value={busca}
          aria-label="Pesquisar cachorros"
        />
        <Filtro filtros={filtros} atualizarFiltro={atualizarFiltro} />
        <div className="Cards-grid" role="list">
          {dadosPaginados.length > 0 ? (
            dadosPaginados.map(item => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                style={{ cursor: 'pointer' }}
                role="listitem"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick(item);
                  }
                }}
                aria-label={`Ver detalhes do cachorro ${item.nome}`}
              >
                <CardVitrine data={item} />
              </div>
            ))
          ) : (
            <p>Nenhum item encontrado</p>
          )}
        </div>

        {totalPaginas > 1 && (
          <nav className="paginacao-wrapper" aria-label="Navegação de páginas">
            <div className="paginacao">
              <button
                onClick={paginaAnterior}
                disabled={paginaAtual === 1}
                aria-label="Página anterior"
              >
                <ChevronLeft size={36} />
              </button>
              <button
                onClick={proximaPagina}
                disabled={paginaAtual === totalPaginas}
                aria-label="Próxima página"
              >
                <ChevronRight size={36} />
              </button>
            </div>
          </nav>
        )}
      </div>
      <Footer />
    </>
  );
}