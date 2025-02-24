import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Retorna todos os comentários
async function coments(req, res) {
  try {
    const allComentarios = await prisma.comentarios.findMany({
      include: {
        usuario: true, // Inclui informações do usuário que criou o comentário
        comentario_pai: true, // Inclui informações do comentário pai (se houver)
        post: true, // Inclui informações do post relacionado
      },
    });
    return res.json(allComentarios);
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    return res.status(500).json({ error: "Erro ao buscar comentários" });
  }
}

// Retorna um comentário específico pelo ID
async function coment(req, res) {
  try {
    const { comentario_id } = req.body;

    if (!comentario_id) {
      return res.status(400).json({ error: "ID do comentário é obrigatório" });
    }

    const specificComentario = await prisma.comentarios.findUnique({
      where: {
        comentario_id: parseInt(comentario_id),
      },
      include: {
        usuario: true,
        comentario_pai: true,
        post: true,
      },
    });

    if (!specificComentario) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }

    return res.json(specificComentario);
  } catch (error) {
    console.error("Erro ao buscar comentário:", error);
    return res.status(500).json({ error: "Erro ao buscar comentário" });
  }
}

// Cria um novo comentário
async function comentCreate(req, res) {
  try {
    const { titulo, conteudo, usuario_id, comentario_pai_id, post_id } = req.body;

    if (!titulo || !conteudo || !usuario_id || !post_id) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const newComentario = await prisma.comentarios.create({
      data: {
        titulo,
        conteudo,
        usuario_id: parseInt(usuario_id),
        comentario_pai_id: comentario_pai_id ? parseInt(comentario_pai_id) : null,
        post_id: parseInt(post_id),
      },
    });

    return res.status(201).json(newComentario);
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    return res.status(500).json({ error: "Erro ao criar comentário" });
  }
}

// Atualiza um comentário existente
async function comentUpdate(req, res) {
  try {
    const { comentario_id, titulo, conteudo, comentario_pai_id, post_id } = req.body;

    if (!comentario_id) {
      return res.status(400).json({ error: "ID do comentário é obrigatório" });
    }

    // Verifica se o comentário existe
    const existingComentario = await prisma.comentarios.findUnique({
      where: {
        comentario_id: parseInt(comentario_id),
      },
    });

    if (!existingComentario) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }

    // Atualiza os dados do comentário
    const updatedComentario = await prisma.comentarios.update({
      where: {
        comentario_id: parseInt(comentario_id),
      },
      data: {
        titulo: titulo || existingComentario.titulo,
        conteudo: conteudo || existingComentario.conteudo,
        comentario_pai_id: comentario_pai_id ? parseInt(comentario_pai_id) : existingComentario.comentario_pai_id,
        post_id: post_id ? parseInt(post_id) : existingComentario.post_id,
      },
    });

    return res.json(updatedComentario);
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error);
    return res.status(500).json({ error: "Erro ao atualizar comentário" });
  }
}

// Deleta um comentário
async function comentDelete(req, res) {
  try {
    const { comentario_id } = req.body;

    if (!comentario_id) {
      return res.status(400).json({ error: "ID do comentário é obrigatório" });
    }

    // Verifica se o comentário existe
    const existingComentario = await prisma.comentarios.findUnique({
      where: {
        comentario_id: parseInt(comentario_id),
      },
    });

    if (!existingComentario) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }

    // Deleta o comentário
    await prisma.comentarios.delete({
      where: {
        comentario_id: parseInt(comentario_id),
      },
    });

    return res.json({ message: "Comentário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar comentário:", error);
    return res.status(500).json({ error: "Erro ao deletar comentário" });
  }
}

export const comentController = {
  coments,
  coment,
  comentCreate,
  comentUpdate,
  comentDelete,
};