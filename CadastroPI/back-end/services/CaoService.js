// src/services/CaoService.js
const CaoRepository = require('../repositories/CaoRepository');

class CaoService {
  constructor() {
    this.caoRepository = new CaoRepository();
  }

  async listarTodos() {
    return this.caoRepository.findAll();
  }

  async listarDisponiveis() {
    return this.caoRepository.findAvailable();
  }

  async buscarPorId(id) {
    const cao = await this.caoRepository.findById(id);
    if (!cao) throw new Error('Cão não encontrado');
    return cao;
  }

  async cadastrar(dados) {
    this.validarDadosCao(dados);
    if (!dados.resumo) {
      dados.resumo = this.gerarResumoAutomatico(dados);
    }
    return this.caoRepository.create(dados);
  }

  async atualizar(id, dados) {
    await this.buscarPorId(id);
    return this.caoRepository.update(id, dados);
  }

  async deletar(id) {
    await this.buscarPorId(id);
    return this.caoRepository.delete(id);
  }

  async buscarComFiltros(filtros) {
    return this.caoRepository.findByFilters(filtros);
  }

  async listarRacas() {
    return this.caoRepository.findAllRacas();
  }

  async marcarComoAdotado(id) {
    return this.atualizar(id, { disponivel: false });
  }

  // Validação dos dados
  validarDadosCao(dados) {
    if (!dados.nome || dados.nome.trim().length < 2) {
      throw new Error('Nome deve ter pelo menos 2 caracteres');
    }
    if (!['Macho', 'Fêmea'].includes(dados.sexo)) {
      throw new Error('Sexo deve ser "Macho" ou "Fêmea"');
    }
    if (!['Pequeno', 'Médio', 'Grande'].includes(dados.porte)) {
      throw new Error('Porte deve ser "Pequeno", "Médio" ou "Grande"');
    }
    if (!dados.comportamento || dados.comportamento.trim().length < 5) {
      throw new Error('Comportamento deve ter pelo menos 5 caracteres');
    }
    if (!dados.id_raca || dados.id_raca <= 0) {
      throw new Error('Raça é obrigatória');
    }
    if (!dados.id_usuario || dados.id_usuario <= 0) {
      throw new Error('Usuário é obrigatório');
    }
  }

  gerarResumoAutomatico(dados) {
    const genero = dados.sexo === 'Macho' ? 'cão' : 'cadela';
    return `${dados.nome} é um ${genero} de porte ${dados.porte.toLowerCase()}, ${dados.comportamento.toLowerCase()}.`;
  }
}

module.exports = CaoService;