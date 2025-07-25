const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class AuthService {
  /**
   * Autentica usuário com email e senha
   */
  async authenticate({ email, password }) {
    console.log('🔍 AuthService - Autenticando usuário:', email);

    if (!email) throw new Error('Email é obrigatório');
    if (!password) throw new Error('Senha é obrigatória');

    // Garante que o e-mail está em lowercase e sem espaços
    const emailBusca = email.trim().toLowerCase();
    console.log('🔍 Email normalizado para busca:', emailBusca);

    // Busca o login pelo email
    const userLogin = await prisma.login.findUnique({
      where: { email: emailBusca }
    });

    console.log('🔍 Resultado userLogin:', userLogin);

    if (!userLogin) {
      console.log('❌ Não encontrou login com esse email');
      throw new Error('Email ou senha incorretos');
    }

    // Busca o usuário pelo id_usuario (agora usando prisma.user)
    const usuario = await prisma.user.findUnique({
      where: { id_usuario: userLogin.id_usuario }
    });

    console.log('🔍 Resultado usuario:', usuario);

    if (!usuario) {
      console.log('❌ Não encontrou usuario com esse id_usuario');
      throw new Error('Dados do usuário não encontrados');
    }

    // Compara a senha fornecida com a hash armazenada
    const passwordMatched = await bcrypt.compare(password, userLogin.senha);
    console.log('🔍 passwordMatched:', passwordMatched);

    if (!passwordMatched) {
      console.log('❌ Senha não confere');
      throw new Error('Email ou senha incorretos');
    }

    // Configurações do JWT
    const secret = process.env.JWT_SECRET || 'fallback_secret_key';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

    // Determina o role baseado no id_permissoes
    const role = usuario.id_permissoes === 1 ? 'admin' : 'user';

    // Cria o token JWT incluindo o role
    const token = jwt.sign(
      { role: role },
      secret,
      {
        subject: String(usuario.id_usuario),
        expiresIn,
      }
    );

    console.log('✅ AuthService - Usuário autenticado com sucesso:', usuario.id_usuario);

    // Retorna dados do usuário e token
    return {
      user: {
        id: usuario.id_usuario,
        name: `${usuario.nome} ${usuario.sobrenome}`,
        email: userLogin.email,
        role: role,
      },
      token,
    };
  }

  /**
   * Registra um novo usuário no sistema
   */
  async register(userData) {
    const { 
      email, 
      password, 
      nome, 
      sobrenome, 
      cpf, 
      telefone, 
      data_nasc,
      id_permissoes = 3 // 3 = usuário comum por padrão
    } = userData;

    console.log('🔍 AuthService - Registrando usuário:', email);

    if (!email) throw new Error('Email é obrigatório');
    if (!password) throw new Error('Senha é obrigatória');
    if (!nome) throw new Error('Nome é obrigatório');
    if (!sobrenome) throw new Error('Sobrenome é obrigatório');
    if (!cpf) throw new Error('CPF é obrigatório');
    if (!telefone) throw new Error('Telefone é obrigatório');
    if (!data_nasc) throw new Error('Data de nascimento é obrigatória');

    // Garante que o e-mail está em lowercase e sem espaços
    const emailBusca = email.trim().toLowerCase();

    // Verifica se usuário já existe
    const existingLogin = await prisma.login.findUnique({
      where: { email: emailBusca }
    });

    if (existingLogin) {
      throw new Error('Usuário já existe com este email');
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário e login em uma transação
    const result = await prisma.$transaction(async (tx) => {
      // Cria o usuário (agora usando prisma.user)
      const newUser = await tx.user.create({
        data: {
          nome,
          sobrenome,
          cpf,
          telefone,
          data_nasc: new Date(data_nasc),
          id_permissoes,
          createdAt: new Date(),
          updateAt: new Date()
        }
      });

      // Cria o login
      const newLogin = await tx.login.create({
        data: {
          id_usuario: newUser.id_usuario,
          email: emailBusca,
          senha: hashedPassword
        }
      });

      return { user: newUser, login: newLogin };
    });

    console.log('✅ AuthService - Usuário registrado:', result.user.id_usuario);
    
    return {
      id: result.user.id_usuario,
      email: result.login.email,
      name: `${result.user.nome} ${result.user.sobrenome}`,
      role: result.user.id_permissoes === 1 ? 'admin' : 'user'
    };
  }
}

module.exports = AuthService;