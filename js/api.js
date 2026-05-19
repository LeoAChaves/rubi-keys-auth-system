class API {
  static async request(endpoint, method = "GET", data = null) {
    const url = `../php/api/${endpoint}.php`;
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
