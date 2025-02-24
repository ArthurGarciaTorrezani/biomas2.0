import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Retorna todos os biomas
async function biomas(req, res) {
  try {
    const allBiomas = await prisma.biomas.findMany();
    return res.json(allBiomas);
  } catch (error) {
    console.error("Erro ao buscar biomas:", error);
    return res.status(500).json({ error: "Erro ao buscar biomas" });
  }
}

// Retorna um bioma específico pelo ID
async function bioma(req, res) {
  try {
    const { bioma_id } = req.body;

    if (!bioma_id) {
      return res.status(400).json({ error: "ID do bioma é obrigatório" });
    }

    const specificBioma = await prisma.biomas.findUnique({
      where: {
        bioma_id: parseInt(bioma_id),
      },
    });

    if (!specificBioma) {
      return res.status(404).json({ error: "Bioma não encontrado" });
    }

    return res.json(specificBioma);
  } catch (error) {
    console.error("Erro ao buscar bioma:", error);
    return res.status(500).json({ error: "Erro ao buscar bioma" });
  }
}

// Cria um novo bioma
async function biomaCreate(req, res) {
  try {
    const { nome, definicao, localizacao } = req.body;

    if (!nome || !definicao || !localizacao) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const newBioma = await prisma.biomas.create({
      data: {
        nome,
        definicao,
        localizacao,
      },
    });

    return res.status(201).json(newBioma);
  } catch (error) {
    console.error("Erro ao criar bioma:", error);
    return res.status(500).json({ error: "Erro ao criar bioma" });
  }
}

// Atualiza um bioma existente
async function biomaUpdate(req, res) {
  try {
    const { bioma_id, nome, definicao, localizacao } = req.body;

    if (!bioma_id) {
      return res.status(400).json({ error: "ID do bioma é obrigatório" });
    }

    // Verifica se o bioma existe
    const existingBioma = await prisma.biomas.findUnique({
      where: {
        bioma_id: parseInt(bioma_id),
      },
    });

    if (!existingBioma) {
      return res.status(404).json({ error: "Bioma não encontrado" });
    }

    // Atualiza os dados do bioma
    const updatedBioma = await prisma.biomas.update({
      where: {
        bioma_id: parseInt(bioma_id),
      },
      data: {
        nome: nome || existingBioma.nome,
        definicao: definicao || existingBioma.definicao,
        localizacao: localizacao || existingBioma.localizacao,
      },
    });

    return res.json(updatedBioma);
  } catch (error) {
    console.error("Erro ao atualizar bioma:", error);
    return res.status(500).json({ error: "Erro ao atualizar bioma" });
  }
}

// Deleta um bioma
async function biomaDelete(req, res) {
  try {
    const { bioma_id } = req.body;

    if (!bioma_id) {
      return res.status(400).json({ error: "ID do bioma é obrigatório" });
    }

    // Verifica se o bioma existe
    const existingBioma = await prisma.biomas.findUnique({
      where: {
        bioma_id: parseInt(bioma_id),
      },
    });

    if (!existingBioma) {
      return res.status(404).json({ error: "Bioma não encontrado" });
    }

    // Deleta o bioma
    await prisma.biomas.delete({
      where: {
        bioma_id: parseInt(bioma_id),
      },
    });

    return res.json({ message: "Bioma deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar bioma:", error);
    return res.status(500).json({ error: "Erro ao deletar bioma" });
  }
}

export const biomaController = {
  biomas,
  bioma,
  biomaCreate,
  biomaUpdate,
  biomaDelete,
};