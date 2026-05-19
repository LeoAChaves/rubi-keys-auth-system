function loadUserData() {
  try {
    const user = localStorage.getItem("user");
    console.log("Dados do usuário carregados:", user); // Debug

    if (user) {
      const userData = JSON.parse(user);
      const userNameSpan = document.getElementById("userName");
      const userEmailSpan = document.getElementById("userEmail");

      if (userNameSpan) {
        userNameSpan.textContent =
          userData.username || userData.name || "Usuário";
      }
      if (userEmailSpan) {
        userEmailSpan.textContent = userData.email || "Email não disponível";
      }

      // Personalizar mensagem de boas-vindas
      const welcomeMsg = document.getElementById("welcomeMessage");
      if (welcomeMsg && userData.username) {
        welcomeMsg.innerHTML = `🤗 Olá, ${userData.username}! Bem-vindo(a) à RUBI Keys. Seu acesso foi autorizado com sucesso.`;
      }
    } else {
      console.warn("Nenhum usuário encontrado no localStorage");
      // Se não tem usuário, redireciona para login
      window.location.href = "./login.html";
    }
  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
  }
}

function setupLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    // Remover event listeners anteriores se existirem
    const newLogoutBtn = logoutBtn.cloneNode(true);
    logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);

    newLogoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("Botão de logout clicado"); // Debug

      try {
        // Limpar dados do localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token"); // Caso exista token
        localStorage.removeItem("auth"); // Caso exista auth

        console.log("LocalStorage limpo"); // Debug

        // Mostrar mensagem

        // Redirecionar para o login (verificando o caminho correto)
        // Tenta diferentes caminhos possíveis
        const loginPaths = [
          "./login.html",
          "login.html",
          "../pages/login.html",
        ];
        let redirected = false;

        for (const path of loginPaths) {
          const testLink = document.createElement("a");
          testLink.href = path;
          if (testLink.protocol === window.location.protocol) {
            window.location.href = path;
            redirected = true;
            break;
          }
        }

        if (!redirected) {
          window.location.href = "./login.html";
        }
      } catch (error) {
        console.error("Erro durante logout:", error);
        alert("Erro ao fazer logout. Tente novamente.");
      }
    });
  } else {
    console.error("Botão de logout não encontrado!");
  }
}

// Verificar se usuário está logado
function checkAuth() {
  const user = localStorage.getItem("user");
  console.log("Verificando autenticação:", user ? "Logado" : "Não logado"); // Debug

  if (!user) {
    console.log("Usuário não autenticado, redirecionando para login");
    window.location.href = "./login.html";
    return false;
  }
  return true;
}

// Inicializar página
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM carregado, inicializando dashboard..."); // Debug

  if (checkAuth()) {
    loadUserData();
    setupLogout();
  }
});

// Fallback: Adicionar listener direto no botão caso o DOMContentLoaded falhe
window.addEventListener("load", function () {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn && !logoutBtn.hasAttribute("data-listener-added")) {
    logoutBtn.setAttribute("data-listener-added", "true");
    logoutBtn.onclick = function (e) {
      e.preventDefault();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "./login.html";
    };
  }
});
