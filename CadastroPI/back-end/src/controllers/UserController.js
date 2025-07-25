// Importa o serviço responsável pela lógica de usuários
const UsuarioService = require('../../services/UserService'); // ajuste o caminho se necessário

class UsuarioController {
  // Lista todos os usuários
  async list(req, res) {
    try {
      const users = await UsuarioService.listAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Busca um usuário pelo ID
  async findById(req, res) {
    try {
      const id = req.params.id;
      const user = await UsuarioService.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Atualiza um usuário pelo ID
  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const updatedUser = await UsuarioService.update(id, data);
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Deleta um usuário pelo ID
  async delete(req, res) {
    try {
      const id = req.params.id;
      await UsuarioService.delete(id);
      res.status(204).send(); // 204 = No Content
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

// Exporta uma instância do controller para ser usada nas rotas
module.exports = new UsuarioController();