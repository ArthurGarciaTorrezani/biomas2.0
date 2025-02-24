import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Função para criar uma sessão (login)
async function sessionCreate(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // Busca o usuário pelo email
    const usuario = await prisma.usuarios.findUnique({
      where: {
        email,
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verifica se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    // Cria uma sessão (aqui você pode usar cookies, JWT ou outra estratégia)
    req.session.user = {
      usuario_id: usuario.usuario_id,
      nome: usuario.nome,
      email: usuario.email,
      adm: usuario.adm,
    };

    console.log(req.session.user)
    return res.json({
      success: true,
      message: "Login realizado com sucesso",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Erro ao criar sessão:", error);
    return res.status(500).json({ error: "Erro ao criar sessão" });
  }
}

// Função para encerrar uma sessão (logout)
function sessionLogout(req, res) {
  try {
    // Destroi a sessão atual
    req.session.destroy((err) => {
      if (err) {
        console.error("Erro ao encerrar sessão:", err);
        return res.status(500).json({ error: "Erro ao encerrar sessão" });
      }
      return res.json({
        logout: "ok",
        message: "Sessão encerrada com sucesso",
      });
    });
  } catch (error) {
    console.error("Erro ao encerrar sessão:", error);
    return res.status(500).json({ error: "Erro ao encerrar sessão" });
  }
}

export const sessionController = {
  sessionCreate,
  sessionLogout,
};
