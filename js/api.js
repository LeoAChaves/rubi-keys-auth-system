class API {
  static async request(endpoint, method = "GET", data = null) {
    // Caminho absoluto para o Railway
    const url = `/php/api/${endpoint}.php`;

    console.log(`API Request: ${method} ${url}`); // Debug

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

      if (!response.ok) {
        const text = await response.text();
        console.error(`HTTP ${response.status}:`, text.substring(0, 200));
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Resposta não é JSON:", text.substring(0, 200));
        throw new Error("Servidor retornou uma resposta inválida");
      }

      const result = await response.json();
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
