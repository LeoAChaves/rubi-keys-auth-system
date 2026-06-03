class API {
  static async request(endpoint, method = "GET", data = null) {
    // URL absoluta baseada no caminho atual
    const basePath =
      window.location.pathname.substring(
        0,
        window.location.pathname.lastIndexOf("/"),
      ) + "/";
    const url = `${basePath}php/api/${endpoint}.php`;

    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);

      // Verificar se a resposta é JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Resposta não é JSON:", text.substring(0, 200));
        throw new Error(
          "Servidor retornou uma resposta inválida. Verifique a conexão.",
        );
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erro na requisição");
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  static register(userData) {
    return this.request("register", "POST", userData);
  }

  static login(credentials) {
    return this.request("login", "POST", credentials);
  }

  static forgotPassword(email) {
    return this.request("forgot-password", "POST", { email });
  }

  static changePassword(data) {
    return this.request("change-password", "POST", data);
  }
}
