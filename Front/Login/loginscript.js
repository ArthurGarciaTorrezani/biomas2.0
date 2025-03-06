document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    fetch("http://localhost:8080/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          window.location.href = "../Main/index.html"; // Redireciona se o login for bem-sucedido
          console.log(data)
        } else {
          alert("Login falhou: " + data.message); // Exibe uma mensagem de erro
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  });
