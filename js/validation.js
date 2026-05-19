class FormValidator {
  static rules = {
    username: {
      required: true,
      minLength: 3,
      maxLength: 50,
      pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
      messages: {
        required: "Nome é obrigatório",
        minLength: "Nome deve ter pelo menos 3 caracteres",
        maxLength: "Nome deve ter no máximo 50 caracteres",
        pattern: "Nome deve conter apenas letras e espaços",
      },
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      messages: {
        required: "Email é obrigatório",
        pattern: "Email inválido",
      },
    },
    password: {
      required: true,
      minLength: 6,
      maxLength: 100,
      messages: {
        required: "Senha é obrigatória",
        minLength: "Senha deve ter pelo menos 6 caracteres",
        maxLength: "Senha muito longa",
      },
    },
    confirmPassword: {
      required: true,
      matchWith: "password",
      messages: {
        required: "Confirmação de senha é obrigatória",
        matchWith: "As senhas não conferem",
      },
    },
    code: {
      required: true,
      exactLength: 6,
      pattern: /^\d+$/,
      messages: {
        required: "Código de verificação é obrigatório",
        exactLength: "Código deve ter exatamente 6 dígitos",
        pattern: "Código deve conter apenas números",
      },
    },
  };

  static validateField(fieldName, value, formData = {}) {
    const rule = this.rules[fieldName];
    if (!rule) return { valid: true, errors: [] };

    const errors = [];

    // Verificar required
    if (rule.required && (!value || value.toString().trim() === "")) {
      errors.push(rule.messages.required);
      return { valid: false, errors };
    }

    if (!value || value.toString().trim() === "") {
      return { valid: true, errors: [] };
    }

    // Verificar minLength
    if (rule.minLength && value.length < rule.minLength) {
      errors.push(rule.messages.minLength);
    }

    // Verificar maxLength
    if (rule.maxLength && value.length > rule.maxLength) {
      errors.push(rule.messages.maxLength);
    }

    // Verificar exactLength
    if (rule.exactLength && value.length !== rule.exactLength) {
      errors.push(rule.messages.exactLength);
    }

    // Verificar pattern
    if (rule.pattern && !rule.pattern.test(value)) {
      errors.push(rule.messages.pattern);
    }

    // Verificar matchWith (para confirmar senha)
    if (rule.matchWith && formData[rule.matchWith] !== value) {
      errors.push(rule.messages.matchWith);
    }

    return {
      valid: errors.length === 0,
      errors: errors,
    };
  }

  static validateForm(formData, fieldsToValidate) {
    const errors = {};
    let isValid = true;

    for (const field of fieldsToValidate) {
      const value = formData[field] || "";
      const validation = this.validateField(field, value, formData);

      if (!validation.valid) {
        errors[field] = validation.errors;
        isValid = false;
      }
    }

    return { isValid, errors };
  }

  static showFieldError(fieldElement, errors) {
    if (!fieldElement) return;

    // Remover erro anterior
    const existingError =
      fieldElement.parentElement?.querySelector(".field-error");
    if (existingError) {
      existingError.remove();
    }

    // Remover classe de erro
    fieldElement.classList.remove("invalid");

    // Adicionar novos erros se houver
    if (errors && errors.length > 0) {
      fieldElement.classList.add("invalid");
      const errorDiv = document.createElement("div");
      errorDiv.className = "field-error";
      errorDiv.innerHTML = errors
        .map((err) => `<small>❌ ${err}</small>`)
        .join("<br>");

      if (fieldElement.parentElement) {
        fieldElement.parentElement.appendChild(errorDiv);
      }
    }
  }

  static clearFieldErrors(formElement) {
    if (!formElement) return;

    // Remover todas as mensagens de erro
    const errors = formElement.querySelectorAll(".field-error");
    errors.forEach((error) => error.remove());

    // Remover classes de erro
    const invalidFields = formElement.querySelectorAll(".invalid");
    invalidFields.forEach((field) => field.classList.remove("invalid"));
  }

  static sanitizeInput(value) {
    if (!value) return "";
    // Remover tags HTML e scripts
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML.trim();
  }

  static validateEmailStrength(email) {
    const strength = {
      score: 0,
      feedback: [],
    };

    if (!email) return strength;

    const commonDomains = [
      "gmail.com",
      "hotmail.com",
      "outlook.com",
      "yahoo.com",
    ];
    const domain = email.split("@")[1];

    if (commonDomains.includes(domain)) {
      strength.score += 1;
      strength.feedback.push("Domínio de email comum");
    }

    if (this.rules.email.pattern.test(email)) {
      strength.score += 2;
      strength.feedback.push("Formato de email válido");
    }

    return strength;
  }

  static validatePasswordStrength(password) {
    const strength = {
      score: 0,
      feedback: [],
      isStrong: false,
    };

    if (!password) return strength;

    // Comprimento
    if (password.length >= 8) {
      strength.score += 1;
      strength.feedback.push("✅ Bom comprimento (8+ caracteres)");
    } else {
      strength.feedback.push("❌ Use pelo menos 8 caracteres");
    }

    // Letras maiúsculas
    if (/[A-Z]/.test(password)) {
      strength.score += 1;
      strength.feedback.push("✅ Contém letras maiúsculas");
    } else {
      strength.feedback.push("❌ Adicione letras maiúsculas");
    }

    // Letras minúsculas
    if (/[a-z]/.test(password)) {
      strength.score += 1;
      strength.feedback.push("✅ Contém letras minúsculas");
    } else {
      strength.feedback.push("❌ Adicione letras minúsculas");
    }

    // Números
    if (/[0-9]/.test(password)) {
      strength.score += 1;
      strength.feedback.push("✅ Contém números");
    } else {
      strength.feedback.push("❌ Adicione números");
    }

    // Caracteres especiais
    if (/[^A-Za-z0-9]/.test(password)) {
      strength.score += 1;
      strength.feedback.push("✅ Contém caracteres especiais");
    } else {
      strength.feedback.push("❌ Adicione caracteres especiais (!@#$% etc)");
    }

    strength.isStrong = strength.score >= 4;

    if (strength.isStrong) {
      strength.feedback.unshift("💪 Senha forte!");
    } else if (strength.score >= 3) {
      strength.feedback.unshift("👍 Senha média");
    } else {
      strength.feedback.unshift("⚠️ Senha fraca");
    }

    return strength;
  }

  static updatePasswordStrengthIndicator(passwordInput, indicatorElement) {
    if (!passwordInput || !indicatorElement) return;

    const password = passwordInput.value;
    const strength = this.validatePasswordStrength(password);

    // Calcular porcentagem (máximo 5 pontos)
    const percentage = (strength.score / 5) * 100;
    indicatorElement.style.width = `${percentage}%`;

    // Mudar cor baseado na força
    if (strength.score >= 4) {
      indicatorElement.style.backgroundColor = "#4caf50";
    } else if (strength.score >= 3) {
      indicatorElement.style.backgroundColor = "#ff9800";
    } else {
      indicatorElement.style.backgroundColor = "#f44336";
    }

    // Atualizar feedback
    const feedbackElement = document.getElementById("password-feedback");
    if (feedbackElement) {
      feedbackElement.innerHTML = strength.feedback.join("<br>");
      feedbackElement.style.display = password ? "block" : "none";
    }
  }
}

// Garantir que a classe esteja disponível globalmente
window.FormValidator = FormValidator;
