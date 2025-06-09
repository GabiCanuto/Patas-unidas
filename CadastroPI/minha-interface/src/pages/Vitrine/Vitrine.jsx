import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import Header from '../../components/Header/Header';
import PatasAleatorias from '../../components/patinhas/patasAleatorias';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filtro from '../../components/filtro/Filtro';
import CardVitrine from '../../components/CardVitrine/CardVitrine';
import Footer from '../../components/footer/Footer';

import './Vitrine.css';

import cachorros from '../../Data/cachorro';

export default function Vitrine() {
  const [filtros, setFiltros] = useState({
    sexo: '',
    porte: '',
    idade: '',
    cor: '',
  });
  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);

  const itensPorPagina = 8;

  function atualizarFiltro(campo, valor) {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor,
    }));
    setPaginaAtual(1);
  }

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

  function paginaAnterior() {
    setPaginaAtual(prev => Math.max(prev - 1, 1));
  }

  function proximaPagina() {
    setPaginaAtual(prev => Math.min(prev + 1, totalPaginas));
  }

  return (
    <>
      <PatasAleatorias />
      <div className="vitrine-content">
        <Header />
        <SearchBar
          placeholder="Pesquisar"
          onChange={e => setBusca(e.target.value)}
          value={busca}
        />
        <Filtro filtros={filtros} atualizarFiltro={atualizarFiltro} />
        <div className="Cards-grid">
          {dadosPaginados.length > 0 ? (
            dadosPaginados.map(item => (
              <CardVitrine key={item.id} data={item} />
            ))
          ) : (
            <p>Nenhum item encontrado</p>
          )}
        </div>

        {totalPaginas > 1 && (
        <div className="paginacao-wrapper">
  <div className="paginacao">
    <button onClick={paginaAnterior} disabled={paginaAtual === 1} aria-label="Página anterior">
      <ChevronLeft size={36} />
    </button>
    <button onClick={proximaPagina} disabled={paginaAtual === totalPaginas} aria-label="Próxima página">
      <ChevronRight size={36} />
    </button>
  </div>
</div>

        )}
      </div>
      <Footer />
    </>
  );
}
