function authenticateSession(req, res, next) {
  console.log(req.session)
  // Verifica se há uma sessão ativa com dados do usuário
  if (req.session && req.session.user) {
    // Se o usuário estiver autenticado, continua para a próxima função
    return next();
  }

  // Se não houver sessão válida, retorna um erro de acesso negado
  return res.status(401).json({ error: "Acesso negado. Faça login para continuar." });
}

export { authenticateSession };