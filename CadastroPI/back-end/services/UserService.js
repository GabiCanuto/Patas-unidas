const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

class UsuarioService {
  // Método para registrar um novo usuário
  static async register(data) {
    const {
      nome,
      sobrenome,
      nome_social,
      data_nasc,
      cpf,
      telefone,
      email,
      senha,
      id_permissoes // agora usa o nome correto do campo
    } = data;

    console.log('🔍 UsuarioService - Registrando usuário:', email);

    if (!email) throw new Error('Email é obrigatório');
    if (!senha) throw new Error('Senha é obrigatória');
    if (!nome) throw new Error('Nome é obrigatório');
    if (!sobrenome) throw new Error('Sobrenome é obrigatório');
    if (!cpf) throw new Error('CPF é obrigatório');
    if (!telefone) throw new Error('Telefone é obrigatório');
    if (!data_nasc) throw new Error('Data de nascimento é obrigatória');

    // Verifica se já existe um login com o email informado
    const existingLogin = await prisma.login.findUnique({ where: { email } });
    if (existingLogin) throw new Error('Email já cadastrado');

    // Verifica se já existe um usuário com o CPF informado
    const existingUser = await prisma.user.findFirst({
      where: { cpf }
    });
    if (existingUser) throw new Error('Usuário já existe com este CPF');

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);

    // Cria o usuário e o login relacionados em uma única transação
    const newUser = await prisma.user.create({
      data: {
        nome,
        sobrenome,
        nome_social: nome_social || null,
        data_nasc: new Date(data_nasc),
        cpf,
        telefone,
        id_permissoes: id_permissoes || 3, // 3 = comum, 1 = admin
        createdAt: new Date(),
        updateAt: new Date(),
        login: {
          create: {
            email,
            senha: hashedPassword
          }
        }
      },
      include: {
        login: true,
        permissoes: true
      }
    });

    console.log('✅ UsuarioService - Usuário criado:', newUser.id_usuario);
    return newUser;
  }

  // Método para autenticar usuário pelo email e senha
  static async authenticate(email, senha) {
    console.log('🔍 UsuarioService - Autenticando usuário:', email);

    if (!email) throw new Error('Email é obrigatório');
    if (!senha) throw new Error('Senha é obrigatória');

    // Busca o login pelo email, incluindo os dados do usuário
    const login = await prisma.login.findUnique({
      where: { email },
      include: {
        usuario: {
          include: {
            permissoes: true
          }
        }
      }
    });

    if (!login) throw new Error('Usuário não encontrado');

    // Compara a senha informada com a senha criptografada no banco
    const isValid = await bcrypt.compare(senha, login.senha);
    if (!isValid) throw new Error('Senha inválida');

    console.log('✅ UsuarioService - Usuário autenticado:', login.usuario.id_usuario);

    // Remove a senha do objeto retornado para segurança
    const { senha: _, ...loginWithoutPassword } = login;
    return {
      ...loginWithoutPassword,
      usuario: {
        ...login.usuario,
        role: login.usuario.id_permissoes === 1 ? 'admin' : 'user',
        id_permissoes: login.usuario.id_permissoes
      }
    };
  }

  // Método para listar todos os usuários com seus logins e permissões
  static async listAll() {
    console.log('🔍 UsuarioService - Listando todos os usuários');

    return prisma.user.findMany({
      include: {
        login: true,
        permissoes: true
      }
    });
  }

  // Método para buscar usuário por ID
  static async findById(id) {
    console.log('🔍 UsuarioService - Buscando usuário por ID:', id);

    return prisma.user.findUnique({
      where: { id_usuario: parseInt(id) },
      include: {
        login: true,
        permissoes: true
      }
    });
  }

  // Método para atualizar usuário
  static async update(id, data) {
    console.log('🔍 UsuarioService - Atualizando usuário:', id);

    const updateData = {
      ...data,
      updateAt: new Date()
    };

    // Remove campos que não devem ser atualizados diretamente
    delete updateData.senha;
    delete updateData.email;

    return prisma.user.update({
      where: { id_usuario: parseInt(id) },
      data: updateData,
      include: {
        login: true,
        permissoes: true
      }
    });
  }
}

module.exports = UsuarioService;