import app from "./app.js";
import { PrismaClient } from "@prisma/client";

// Instância do PrismaClient
const prisma = new PrismaClient();

async function startServer() {
  try {
    // Conecta ao banco de dados
    await prisma.$connect();
    console.log("Conectado ao banco de dados");

    // Inicia o servidor
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    process.exit(1); // Encerra a aplicação caso haja erro crítico
  }
}

startServer();