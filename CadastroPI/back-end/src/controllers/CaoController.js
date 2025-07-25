// src/controllers/CaoController.js
const CaoService = require('../services/CaoService');

class CaoController {
  constructor() {
    this.caoService = new CaoService();
  }

  listarTodos = async (req, res) => {
    try {
      const caes = await this.caoService.listarTodos();
      res.status(200).json({ success: true, data: caes, total: caes.length });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  listarDisponiveis = async (req, res) => {
    try {
      const caes = await this.caoService.listarDisponiveis();
      res.status(200).json({ success: true, data: caes, total: caes.length });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID inválido' });
      const cao = await this.caoService.buscarPorId(id);
      res.status(200).json({ success: true, data: cao });
    } catch (error) {
      res.status(error.message === 'Cão não encontrado' ? 404 : 500).json({ success: false, message: error.message });
    }
  };

  cadastrar = async (req, res) => {
    try {
      const dados = req.body;
      dados.id_usuario = dados.id_usuario || 1; // Exemplo: usuário padrão
      const cao = await this.caoService.cadastrar(dados);
      res.status(201).json({ success: true, message: 'Cão cadastrado com sucesso', data: cao });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  atualizar = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID inválido' });
      const dados = req.body;
      const cao = await this.caoService.atualizar(id, dados);
      res.status(200).json({ success: true, message: 'Cão atualizado com sucesso', data: cao });
    } catch (error) {
      res.status(error.message === 'Cão não encontrado' ? 404 : 500).json({ success: false, message: error.message });
    }
  };

  deletar = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id) || id <= 0) return res.status(400).json({ success: false, message: 'ID inválido' });
      await this.caoService.deletar(id);
      res.status(200).json({ success: true, message: 'Cão deletado com sucesso' });
    } catch (error) {
      res.status(error.message === 'Cão não encontrado' ? 404 : 500).json({ success: false, message: error.message });
    }
  };

  buscarComFiltros = async (req, res) => {
    try {
      const { sexo, porte, idade, cor, disponivel, id_raca } = req.query;
      const filtros = {};
      if (sexo) filtros.sexo = sexo;
      if (porte) filtros.porte = porte;
      if (idade) filtros.idade = idade;
      if (cor) filtros.cor = cor;
      if (disponivel !== undefined) filtros.disponivel = disponivel === 'true';
      if (id_raca) filtros.id_raca = parseInt(id_raca);
      const caes = await this.caoService.buscarComFiltros(filtros);
      res.status(200).json({ success: true, data: caes, total: caes.length, filtros });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  listarRacas = async (req, res) => {
    try {
      const racas = await this.caoService.listarRacas();
      res.status(200).json({ success: true, data: racas });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  marcarComoAdotado = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID inválido' });
      const cao = await this.caoService.marcarComoAdotado(id);
      res.status(200).json({ success: true, message: `${cao.nome} foi marcado como adotado!`, data: cao });
    } catch (error) {
      res.status(error.message === 'Cão não encontrado' ? 404 : 500).json({ success: false, message: error.message });
    }
  };
}

module.exports = CaoController;