document.addEventListener("DOMContentLoaded", async () => {
    const postsContainer = document.querySelector(".posts");
    
    try {
      const response = await fetch("  http://localhost:8080/postscoments");
      const postsData = await response.json();
      
      if (!postsData || !postsData.length) return;
      
      postsData.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
  
        // Verifica se existem comentários antes de acessá-los
        const comentarios = post.comentarios && post.comentarios.data ? post.comentarios.data : [];
        console.log(post.post)
        postElement.innerHTML = `
          <h3>${post.titulo}</h3>
          <p>${post.conteudo}</p>
          <h4>Comentários:</h4>
          <ul>
            ${comentarios.length > 0 
              ? comentarios.map(coment => `<li>${coment.conteudo}</li>`).join("")
              : "<li>Sem comentários</li>"
            }
          </ul>
          <textarea placeholder="Adicione um comentário..."></textarea>
          <button>Comentar</button>
          <hr>
        `;
        
        postsContainer.appendChild(postElement);
      });
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    }
  });
  