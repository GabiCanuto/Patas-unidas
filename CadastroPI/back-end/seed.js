const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Gera o hash das senhas
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  // Cria o usuário admin
  const adminUser = await prisma.user.create({
    data: {
      nome: 'Admin',
      sobrenome: 'Master',
      cpf: '00000000000',
      telefone: '11999999999',
      data_nasc: new Date('1990-01-01'),
      id_permissoes: 1, // 1 = admin
      createdAt: new Date(),
      updateAt: new Date()
    }
  });

  // Cria o login do admin
  await prisma.login.create({
    data: {
      id_usuario: adminUser.id_usuario,
      email: 'admin@example.com',
      senha: adminPassword
    }
  });

  // Cria o usuário comum
  const commonUser = await prisma.user.create({
    data: {
      nome: 'Usuário',
      sobrenome: 'Comum',
      cpf: '11111111111',
      telefone: '11988888888',
      data_nasc: new Date('1995-05-05'),
      id_permissoes: 3, // 3 = comum
      createdAt: new Date(),
      updateAt: new Date()
    }
  });

  // Cria o login do usuário comum
  await prisma.login.create({
    data: {
      id_usuario: commonUser.id_usuario,
      email: 'user@example.com',
      senha: userPassword
    }
  });

  console.log('✅ Seed completed: Usuário admin e usuário comum criados com sucesso!');
}

main()
  .catch(e => {
    console.error('❌ Erro ao rodar o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/*
  Como usar:
  - Salve este arquivo como seed.js na raiz do projeto.
  - Rode: node seed.js
  - Faça login com:
      Admin:
        E-mail: admin@example.com
        Senha:  admin123
      Usuário comum:
        E-mail: user@example.com
        Senha:  user123
*/