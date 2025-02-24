import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();


function userDelete(req,res){
  return res.json("logado pai")
}
// Retorna todos os usuários
async function users(req, res) {
  try {
    const allUsers = await prisma.usuarios.findMany();
    return res.json(allUsers);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
}

// Retorna um usuário específico pelo ID
async function user(req, res) {
  try {
    const { usuario_id } = req.body;

    if (!usuario_id) {
      return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    const specificUser = await prisma.usuarios.findUnique({
      where: {
        usuario_id: parseInt(usuario_id), // Certifique-se de que o ID seja um número
      },
    });

    if (!specificUser) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.json(specificUser);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ error: "Erro ao buscar usuário" });
  }
}

// Cria um novo usuário
async function userCreate(req, res) {
  try {
    const { adm, nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    let salt = bcrypt.genSaltSync(10);
    let senha_hash = bcrypt.hashSync(senha, salt);

    const usuario = await prisma.usuarios.create({
      data: {
        adm: adm || false, // Define 'adm' como false se não for fornecido
        nome,
        email,
        senha_hash,
      },
    });

    return res.status(201).json(usuario);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
}

// Atualiza um usuário existente
async function userUpdate(req, res) {
  try {
    const { usuario_id, nomeNovo, emailNovo, senhaNova } = req.body;

    if (!usuario_id) {
      return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    // Verifica se o usuário existe
    const existingUser = await prisma.usuarios.findUnique({
      where: {
        usuario_id: parseInt(usuario_id),
      },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Atualiza os dados do usuário
    const updatedUser = await prisma.usuarios.update({
      where: {
        usuario_id: parseInt(usuario_id),
      },
      data: {
        nome: nomeNovo || existingUser.nome,
        email: emailNovo || existingUser.email,
        senha_hash: senhaNova || existingUser.senha_hash,
      },
    });

    return res.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
}



export const userController = {
  users,
  user,
  userCreate,
  userUpdate,
  userDelete
};
