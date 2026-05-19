// Função para verificar se existe sessão ativa
function hasActiveSession() {
  try {
    // Verificar diferentes formas de armazenamento de sessão
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const auth = localStorage.getItem("auth");

    // Verificar também sessionStorage caso esteja sendo usado
    const sessionUser = sessionStorage.getItem("user");
    const sessionToken = sessionStorage.getItem("token");

    // Retorna true se encontrar qualquer evidência de sessão ativa
    return !!(user || token || auth || sessionUser || sessionToken);
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);
    return false;
  }
}

// Função para redirecionar baseado na sessão
function handleLoginClick(event) {
  event.preventDefault();

  console.log("Verificando sessão ativa...");

  if (hasActiveSession()) {
    // Se tem sessão ativa, redireciona para o dashboard
    console.log("Sessão ativa encontrada! Redirecionando para dashboard...");

    // Verificar se o dashboard existe em diferentes caminhos
    const dashboardPaths = [
      "./html/dashboard.html",
      "./dashboard.html",
      "./pages/dashboard.html",
    ];

    // Tentar redirecionar para o dashboard
    let found = false;
    for (const path of dashboardPaths) {
      // Criar um elemento de link para testar se o caminho é válido
      const testLink = document.createElement("a");
      testLink.href = path;
      if (testLink.protocol === window.location.protocol) {
        window.location.href = path;
        found = true;
        break;
      }
    }

    if (!found) {
      // Se não encontrar nenhum caminho específico, tenta o padrão
      window.location.href = "./html/dashboard.html";
    }
  } else {
    // Se não tem sessão, redireciona para o login normalmente
    console.log("Nenhuma sessão ativa. Redirecionando para login...");
    window.location.href = "./html/login.html";
  }
}

// Verificar sessão automaticamente ao carregar a página
function autoCheckSession() {
  if (hasActiveSession()) {
    console.log("Sessão ativa detectada automaticamente!");

    // Opcional: Mostrar mensagem para o usuário
    const mensagemDiv = document.createElement("div");
    mensagemDiv.innerHTML = `
            <div style="
              position: fixed;
              top: 20px;
              right: 20px;
              background: #4CAF50;
              color: white;
              padding: 15px;
              border-radius: 5px;
              z-index: 1000;
              box-shadow: 0 2px 5px rgba(0,0,0,0.2);
              animation: slideIn 0.5s ease-out;
            ">
              ✅ Sessão ativa detectada! Redirecionando...
            </div>
            <style>
              @keyframes slideIn {
                from {
                  transform: translateX(100%);
                  opacity: 0;
                }
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
            </style>
          `;
    document.body.appendChild(mensagemDiv);

    // Remover mensagem após 2 segundos e redirecionar
    setTimeout(() => {
      mensagemDiv.remove();
      const dashboardPaths = [
        "./html/dashboard.html",
        "./dashboard.html",
        "./pages/dashboard.html",
      ];

      for (const path of dashboardPaths) {
        const testLink = document.createElement("a");
        testLink.href = path;
        if (testLink.protocol === window.location.protocol) {
          window.location.href = path;
          break;
        }
      }
    }, 2000);
  }
}

// Configurar evento de clique no link de login
function setupLoginLink() {
  const loginLink = document.getElementById("loginLink");
  if (loginLink) {
    // Remover event listeners anteriores se existirem
    const newLoginLink = loginLink.cloneNode(true);
    loginLink.parentNode.replaceChild(newLoginLink, loginLink);

    newLoginLink.addEventListener("click", handleLoginClick);
    console.log("Link de login configurado com verificação de sessão");
  } else {
    console.error("Link de login não encontrado!");
  }
}

// Função para limpar sessão (útil para debug)
window.clearSession = function () {
  localStorage.clear();
  sessionStorage.clear();
  console.log("Sessão limpa!");
  alert("Sessão limpa com sucesso!");
  location.reload();
};

// Inicializar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  console.log("Página carregada, configurando verificações...");
  setupLoginLink();

  // Verificar sessão automaticamente após 1 segundo
  setTimeout(autoCheckSession, 1000);
});

// Verificação adicional quando a janela for carregada completamente
window.addEventListener("load", () => {
  console.log("Window totalmente carregada");
  // Garantir que o link de login está configurado
  setupLoginLink();
});
