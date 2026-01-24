import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const authProvider = {
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        username,
        password,
      });

      const { token, role } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("role", role);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      throw new Error("Неверные данные");
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    delete axios.defaults.headers.common["Authorization"];
    return Promise.resolve();
  },

  checkAuth: () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return Promise.resolve();
    }
    return Promise.reject();
  },

  checkError: (error: { response: { status: any } }) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => {
    const role = localStorage.getItem("role");
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export default authProvider;
