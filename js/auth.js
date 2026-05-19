class AuthManager {
  static showMessage(message, isError = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isError ? "error" : "success"}`;
    messageDiv.textContent = message;

    const existingMessage = document.querySelector(".message");
    if (existingMessage) {
      existingMessage.remove();
    }

    const form = document.querySelector("#cadastroUsuario");
    if (form) {
      form.insertBefore(messageDiv, form.firstChild);
    }

    setTimeout(() => messageDiv.remove(), 5000);
  }

  static setupPasswordStrength() {
    // Verificar se está na página correta (apenas register e changePassword)
    const currentPage = window.location.pathname.split("/").pop();
    const allowedPages = ["register.html", "changePassword.html"];

    if (!allowedPages.includes(currentPage)) {
      return; // Não criar barra de força em outras páginas
    }

    // Aguardar um pouco para garantir que o DOM está pronto
    setTimeout(() => {
      const passwordInput =
        document.getElementById("senha") ||
        document.getElementById("novaSenha");
      if (!passwordInput) return;

      // Verificar se o container já existe
      if (
        passwordInput.parentElement?.querySelector(
          ".password-strength-container",
        )
      ) {
        return;
      }

      // Criar container para a barra de força
      const container = document.createElement("div");
      container.className = "password-strength-container";
      container.style.marginTop = "10px";
      container.style.marginBottom = "15px";

      container.innerHTML = `
                <div class="password-strength-bar" style="height: 5px; background-color: #e0e0e0; border-radius: 3px; overflow: hidden;">
                    <div class="password-strength-indicator" style="height: 100%; width: 0%; transition: all 0.3s ease; border-radius: 3px;"></div>
                </div>
                <div id="password-feedback" class="password-feedback" style="margin-top: 8px; font-size: 12px; color: #666; display: none;"></div>
            `;

      // Inserir após o campo de senha
      passwordInput.parentElement.appendChild(container);

      const indicator = container.querySelector(".password-strength-indicator");

      // Adicionar evento de input
      passwordInput.addEventListener("input", function () {
        if (window.FormValidator) {
          window.FormValidator.updatePasswordStrengthIndicator(
            passwordInput,
            indicator,
          );
        } else {
          console.error("FormValidator não está disponível");
        }
      });

      // Trigger inicial
      if (window.FormValidator) {
        window.FormValidator.updatePasswordStrengthIndicator(
          passwordInput,
          indicator,
        );
      }
    }, 100);
  }

  static setupRealtimeValidation() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        if (!window.FormValidator) return;

        const fieldName =
          input.id === "confirmarSenha"
            ? "confirmPassword"
            : input.id === "novaSenha"
              ? "password"
              : input.id === "confirmarNovaSenha"
                ? "confirmPassword"
                : input.id === "codigo"
                  ? "code"
                  : input.id;

        const formData = {};

        if (fieldName === "confirmPassword") {
          const passwordInput =
            document.getElementById("senha") ||
            document.getElementById("novaSenha");
          if (passwordInput) {
            formData.password = passwordInput.value;
          }
        }

        const validation = window.FormValidator.validateField(
          fieldName,
          input.value,
          formData,
        );
        if (!validation.valid) {
          window.FormValidator.showFieldError(input, validation.errors);
        } else {
          window.FormValidator.showFieldError(input, []);
        }
      });

      input.addEventListener("input", () => {
        if (window.FormValidator) {
          window.FormValidator.showFieldError(input, []);
        }
      });
    });
  }

  static async handleRegister(event) {
    event.preventDefault();

    if (!window.FormValidator) {
      console.error("FormValidator não carregado");
      return;
    }

    const formData = {
      username: document.getElementById("username")?.value,
      email: document.getElementById("email")?.value,
      password: document.getElementById("senha")?.value,
      confirmPassword: document.getElementById("confirmarSenha")?.value,
    };

    window.FormValidator.clearFieldErrors(event.target);

    const validation = window.FormValidator.validateForm(formData, [
      "username",
      "email",
      "password",
      "confirmPassword",
    ]);

    if (!validation.isValid) {
      for (const [field, errors] of Object.entries(validation.errors)) {
        const fieldElement = document.getElementById(
          field === "confirmPassword" ? "confirmarSenha" : field,
        );
        if (fieldElement) {
          window.FormValidator.showFieldError(fieldElement, errors);
        }
      }
      return;
    }

    const sanitizedData = {
      username: window.FormValidator.sanitizeInput(formData.username),
      email: window.FormValidator.sanitizeInput(formData.email),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Cadastrando...";

    try {
      const response = await API.register(sanitizedData);
      AuthManager.showMessage(response.message);
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 2000);
    } catch (error) {
      AuthManager.showMessage(error.message, true);
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  static async handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email")?.value;
    const password = document.getElementById("senha")?.value;

    if (!window.FormValidator) {
      console.error("FormValidator não carregado");
      return;
    }

    window.FormValidator.clearFieldErrors(event.target);

    const emailValidation = window.FormValidator.validateField("email", email);
    const passwordValidation = window.FormValidator.validateField(
      "password",
      password,
    );

    if (!emailValidation.valid) {
      const emailField = document.getElementById("email");
      window.FormValidator.showFieldError(emailField, emailValidation.errors);
      return;
    }

    if (!passwordValidation.valid) {
      const passwordField = document.getElementById("senha");
      window.FormValidator.showFieldError(
        passwordField,
        passwordValidation.errors,
      );
      return;
    }

    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Entrando...";

    try {
      const response = await API.login({ email, password });
      AuthManager.showMessage(response.message);
      localStorage.setItem("user", JSON.stringify(response.data));
      setTimeout(() => {
        window.location.href = "./dashboard.html"; // Redirecionar para o dashboard
      }, 1500);
    } catch (error) {
      AuthManager.showMessage(error.message, true);
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  static async handleForgotPassword(event) {
    event.preventDefault();

    const email = document.getElementById("email")?.value;

    if (!window.FormValidator) return;

    window.FormValidator.clearFieldErrors(event.target);

    const emailValidation = window.FormValidator.validateField("email", email);

    if (!emailValidation.valid) {
      const emailField = document.getElementById("email");
      window.FormValidator.showFieldError(emailField, emailValidation.errors);
      return;
    }

    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    try {
      await API.forgotPassword(email);
      AuthManager.showMessage("Código enviado! Verifique seu email.");
      sessionStorage.setItem("resetEmail", email);
      setTimeout(() => {
        window.location.href = "./changePassword.html";
      }, 2000);
    } catch (error) {
      AuthManager.showMessage(error.message, true);
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  static async handleChangePassword(event) {
    event.preventDefault();

    const code = document.getElementById("codigo")?.value;
    const newPassword = document.getElementById("novaSenha")?.value;
    const confirmPassword =
      document.getElementById("confirmarNovaSenha")?.value;

    if (!window.FormValidator) return;

    window.FormValidator.clearFieldErrors(event.target);

    const formData = {
      code: code,
      password: newPassword,
      confirmPassword: confirmPassword,
    };

    const codeValidation = window.FormValidator.validateField("code", code);
    const passwordValidation = window.FormValidator.validateField(
      "password",
      newPassword,
    );
    const confirmValidation = window.FormValidator.validateField(
      "confirmPassword",
      confirmPassword,
      { password: newPassword },
    );

    let hasError = false;

    if (!codeValidation.valid) {
      const codeField = document.getElementById("codigo");
      window.FormValidator.showFieldError(codeField, codeValidation.errors);
      hasError = true;
    }

    if (!passwordValidation.valid) {
      const passwordField = document.getElementById("novaSenha");
      window.FormValidator.showFieldError(
        passwordField,
        passwordValidation.errors,
      );
      hasError = true;
    }

    if (!confirmValidation.valid) {
      const confirmField = document.getElementById("confirmarNovaSenha");
      window.FormValidator.showFieldError(
        confirmField,
        confirmValidation.errors,
      );
      hasError = true;
    }

    if (hasError) return;

    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Alterando...";

    try {
      const response = await API.changePassword({
        code,
        newPassword,
        confirmPassword,
      });
      AuthManager.showMessage(response.message);
      sessionStorage.removeItem("resetEmail");
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 2000);
    } catch (error) {
      AuthManager.showMessage(error.message, true);
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  static checkSession() {
    const user = localStorage.getItem("user");
    const currentPage = window.location.pathname.split("/").pop();
    const protectedPages = ["index.html"];

    if (!user && protectedPages.includes(currentPage)) {
      window.location.href = "./login.html";
    }

    const authPages = [
      "login.html",
      "register.html",
      "forgotPassword.html",
      "changePassword.html",
    ];
    if (user && authPages.includes(currentPage)) {
      window.location.href = "../index.html";
    }
  }

  static init() {
    console.log("AuthManager iniciado...");

    // Aguardar o FormValidator carregar
    const checkValidator = setInterval(() => {
      if (window.FormValidator) {
        clearInterval(checkValidator);
        console.log("FormValidator carregado!");

        AuthManager.setupRealtimeValidation();
        AuthManager.setupPasswordStrength(); // Agora só cria a barra nas páginas permitidas
        AuthManager.checkSession();
      }
    }, 100);

    // Timeout após 5 segundos
    setTimeout(() => clearInterval(checkValidator), 5000);

    const path = window.location.pathname;
    const page = path.split("/").pop();

    switch (page) {
      case "register.html":
        const registerForm = document.getElementById("cadastroUsuario");
        if (registerForm) {
          registerForm.addEventListener("submit", (e) =>
            AuthManager.handleRegister(e),
          );
        }
        break;

      case "login.html":
        const loginForm = document.getElementById("cadastroUsuario");
        if (loginForm) {
          loginForm.addEventListener("submit", (e) =>
            AuthManager.handleLogin(e),
          );
        }
        break;

      case "forgotPassword.html":
        const forgotForm = document.getElementById("cadastroUsuario");
        if (forgotForm) {
          forgotForm.addEventListener("submit", (e) =>
            AuthManager.handleForgotPassword(e),
          );
        }
        break;

      case "changePassword.html":
        const changeForm = document.getElementById("cadastroUsuario");
        if (changeForm) {
          changeForm.addEventListener("submit", (e) =>
            AuthManager.handleChangePassword(e),
          );
        }
        break;
    }
  }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => AuthManager.init());
} else {
  AuthManager.init();
}
