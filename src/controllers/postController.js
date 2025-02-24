import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Retorna todos os posts
async function posts(req, res) {
  try {
    const allPosts = await prisma.posts.findMany({
      include: {
        bioma: true, // Inclui informações do bioma relacionado
        usuario: true, // Inclui informações do usuário que criou o post
      },
    });
    return res.json(allPosts);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return res.status(500).json({ error: "Erro ao buscar posts" });
  }
}

// Retorna um post específico pelo ID
async function post(req, res) {
  try {
    const { post_id } = req.body;

    if (!post_id) {
      return res.status(400).json({ error: "ID do post é obrigatório" });
    }

    const specificPost = await prisma.posts.findUnique({
      where: {
        post_id: parseInt(post_id),
      },
      include: {
        bioma: true, // Inclui informações do bioma relacionado
        usuario: true, // Inclui informações do usuário que criou o post
      },
    });

    if (!specificPost) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    return res.json(specificPost);
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return res.status(500).json({ error: "Erro ao buscar post" });
  }
}

// Cria um novo post
async function postCreate(req, res) {
  try {
    const { titulo, conteudo, bioma_id, usuario_id } = req.body;

    if (!titulo || !conteudo || !usuario_id) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const newPost = await prisma.posts.create({
      data: {
        titulo,
        conteudo,
        bioma_id: bioma_id ? parseInt(bioma_id) : null, // Bioma é opcional
        usuario_id: parseInt(usuario_id),
      },
    });

    return res.status(201).json(newPost);
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return res.status(500).json({ error: "Erro ao criar post" });
  }
}

// Atualiza um post existente
async function postUpdate(req, res) {
  try {
    const { post_id, titulo, conteudo, bioma_id, usuario_id } = req.body;

    if (!post_id) {
      return res.status(400).json({ error: "ID do post é obrigatório" });
    }

    // Verifica se o post existe
    const existingPost = await prisma.posts.findUnique({
      where: {
        post_id: parseInt(post_id),
      },
    });

    if (!existingPost) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    // Atualiza os dados do post
    const updatedPost = await prisma.posts.update({
      where: {
        post_id: parseInt(post_id),
      },
      data: {
        titulo: titulo || existingPost.titulo,
        conteudo: conteudo || existingPost.conteudo,
        bioma_id: bioma_id ? parseInt(bioma_id) : existingPost.bioma_id,
        usuario_id: usuario_id ? parseInt(usuario_id) : existingPost.usuario_id,
      },
    });

    return res.json(updatedPost);
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    return res.status(500).json({ error: "Erro ao atualizar post" });
  }
}

// Deleta um post
async function postDelete(req, res) {
  try {
    const { post_id } = req.body;

    if (!post_id) {
      return res.status(400).json({ error: "ID do post é obrigatório" });
    }

    // Verifica se o post existe
    const existingPost = await prisma.posts.findUnique({
      where: {
        post_id: parseInt(post_id),
      },
    });

    if (!existingPost) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    // Deleta o post
    await prisma.posts.delete({
      where: {
        post_id: parseInt(post_id),
      },
    });

    return res.json({ message: "Post deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    return res.status(500).json({ error: "Erro ao deletar post" });
  }
}

// Retorna todos os posts com seus comentários
async function postscoments(req, res) {
  try {
    const allPosts = await prisma.posts.findMany({
      include: {
        bioma: true, // Inclui informações do bioma relacionado
        usuario: true, // Inclui informações do usuário que criou o post
        comentarios: true, // Inclui os comentários relacionados ao post
      },
    });

    return res.json(allPosts);
  } catch (error) {
    console.error("Erro ao buscar posts com comentários:", error);
    return res
      .status(500)
      .json({ error: "Erro ao buscar posts com comentários" });
  }
}

async function postsComComentarios(req, res) {
  try {
    const allPosts = await prisma.posts.findMany({
      include: {
        bioma: true, // Inclui informações do bioma relacionado
        usuario: true, // Inclui informações do usuário que criou o post
        comentarios: {
          include: {
            usuario: true, // Inclui informações do usuário que criou o comentário
            comentario_pai: true, // Inclui informações do comentário pai (se houver)
            comentarios_filho: {
              include: {
                usuario: true, // Inclui informações do usuário que criou o comentário filho
              },
            },
          },
        },
      },
    });

    return res.json(allPosts);
  } catch (error) {
    console.error("Erro ao buscar posts com comentários:", error);
    return res.status(500).json({ error: "Erro ao buscar posts com comentários" });
  }
}

export const postController = {
  posts,
  post,
  postCreate,
  postUpdate,
  postscoments,
  postDelete,
  postsComComentarios
};
