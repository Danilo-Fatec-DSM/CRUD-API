function iniciar() {
  const form = document.getElementById("formCadastro");
  const mensagem = document.getElementById("mensagem");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    try {
      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email }),
      });

      const data = await response.json();
      mensagem.textContent = response.ok
        ? data.mensagem || "Usuário cadastrado com sucesso!"
        : data.erro || "Erro ao cadastrar.";
    } catch (error) {
      mensagem.textContent = `Erro na requisição: ${error.message}`;
    }
  });

  document.getElementById("btnMostrar").addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:3000/api/usuarios");
      const data = await response.json();

      if (response.ok) {
        mensagem.innerHTML =
          "<h3>Usuários:</h3><ul>" +
          data.map((u) => `<li>${u.nome} - ${u.email}</li>`).join("") +
          "</ul>";
      } else {
        mensagem.textContent = data.erro || "Erro ao obter usuários.";
      }
    } catch (error) {
      mensagem.textContent = `Erro: ${error.message}`;
    }
  });

  document
    .getElementById("btnModificar")
    .addEventListener("click", async () => {
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;

      try {
        const response = await fetch(
          `http://localhost:3000/api/usuarios/${email}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome }),
          }
        );

        const data = await response.json();
        mensagem.textContent = response.ok
          ? data.mensagem || "Usuário modificado."
          : data.erro || "Erro ao modificar.";
      } catch (error) {
        mensagem.textContent = `Erro: ${error.message}`;
      }
    });

  document.getElementById("btnDeletar").addEventListener("click", async () => {
    const email = document.getElementById("email").value;

    try {
      const response = await fetch(
        `http://localhost:3000/api/usuarios/${email}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      mensagem.textContent = response.ok
        ? data.mensagem || "Usuário deletado."
        : data.erro || "Erro ao deletar.";
    } catch (error) {
      mensagem.textContent = `Erro: ${error.message}`;
    }
  });
}

window.addEventListener("DOMContentLoaded", iniciar);
