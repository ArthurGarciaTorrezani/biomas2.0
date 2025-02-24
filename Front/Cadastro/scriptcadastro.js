document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
  
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
            const response = await fetch("http://localhost:8080/usercreate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
                window.location.href = "../Login/login.html"; // Redireciona para a página de login
            } else {
                alert(data.error); // Exibe erro caso o cadastro falhe
            }
        } catch (error) {
            console.error("Erro ao fazer cadastro:", error);
            alert("Erro ao conectar ao servidor.");
        }
    });
});