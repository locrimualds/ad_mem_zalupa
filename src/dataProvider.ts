import { fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const apiUrl = import.meta.env.VITE_API_URL;

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const token = localStorage.getItem("authToken");
  options.headers = new Headers(options.headers || {});

  if (token) {
    options.headers.set("Authorization", `Bearer ${token}`);
  }

  return fetchUtils.fetchJson(url, options);
};

const handleDeleteError = (error: any) => {
  if (error.status === 409) {
    try {
      const parsed =
        typeof error.body === "string" ? JSON.parse(error.body) : error.body;

      if (parsed?.error) {
        error.message = parsed.error;
      }
    } catch {
      error.message = "Conflict occurred";
    }
  }
};

const restProvider = simpleRestProvider(apiUrl, httpClient);

const dataProvider = {
  ...restProvider,

  delete: async (resource: any, params: any) => {
    try {
      return await restProvider.delete(resource, params);
    } catch (error: any) {
      handleDeleteError(error);
      throw error;
    }
  },

  deleteMany: async (resource: any, params: any) => {
    try {
      return await restProvider.deleteMany(resource, params);
    } catch (error: any) {
      handleDeleteError(error);
      throw error;
    }
  },
};

export default dataProvider;
