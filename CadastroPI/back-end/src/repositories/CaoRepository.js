// src/repositories/CaoRepository.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CaoRepository {
  // Buscar todos os cães
  async findAll() {
    return prisma.cao.findMany({
      include: {
        raca: true,
        usuario: {
          select: { nome: true, sobrenome: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Buscar cães disponíveis
  async findAvailable() {
    return prisma.cao.findMany({
      where: { disponivel: true },
      include: {
        raca: true,
        usuario: {
          select: { nome: true, sobrenome: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Buscar cão por ID
  async findById(id) {
    return prisma.cao.findUnique({
      where: { id_cao: id },
      include: {
        raca: true,
        usuario: {
          select: { nome: true, sobrenome: true }
        }
      }
    });
  }

  // Criar novo cão
  async create(data) {
    // Valor padrão de apadrinhamento baseado no porte
    if (!data.valorApadrinhamento) {
      data.valorApadrinhamento = this.calcularValorPadrao(data.porte);
    }
    return prisma.cao.create({
      data,
      include: {
        raca: true,
        usuario: {
          select: { nome: true, sobrenome: true }
        }
      }
    });
  }

  // Atualizar cão
  async update(id, data) {
    return prisma.cao.update({
      where: { id_cao: id },
      data,
      include: {
        raca: true,
        usuario: {
          select: { nome: true, sobrenome: true }
        }
      }
    });
  }

  // Deletar cão
  async delete(id) {
    return prisma.cao.delete({
      where: { id_cao: id }
    });
  }

  // Buscar por filtros
  async findByFilters(filters) {
    return prisma.cao.findMany({
      where: filters,
      include: {
        raca: true,
        usuario: {
          select: { nome: true, sobrenome: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Buscar todas as raças
  async findAllRacas() {
    return prisma.raca.findMany({
      orderBy: { nome: 'asc' }
    });
  }

  // Valor padrão por porte
  calcularValorPadrao(porte) {
    if (!porte) return 50;
    switch (porte.toLowerCase()) {
      case 'pequeno': return 50;
      case 'médio': return 65;
      case 'grande': return 85;
      default: return 50;
    }
  }
}

module.exports = CaoRepository;