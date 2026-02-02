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

const mapIdIfCards = (resource: string, record: any) =>
  resource === "cards" ? { ...record, id: record.cardNum } : record;

const dataProvider = {
  ...restProvider,

  getList: async (resource: any, params: any) => {
    const result = await restProvider.getList(resource, params);

    return {
      ...result,
      data: result.data.map((r: any) => mapIdIfCards(resource, r)),
    };
  },

  getOne: async (resource: any, params: any) => {
    const result = await restProvider.getOne(resource, params);

    return {
      ...result,
      data: mapIdIfCards(resource, result.data),
    };
  },

  getMany: async (resource: any, params: any) => {
    const result = await restProvider.getMany(resource, params);

    return {
      ...result,
      data: result.data.map((r: any) => mapIdIfCards(resource, r)),
    };
  },

  update: async (resource: any, params: any) => {
    const result = await restProvider.update(resource, params);

    return {
      ...result,
      data: mapIdIfCards(resource, result.data),
    };
  },

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

  updateStatus: async (resource: string, id: number, status: boolean) => {
    const url = `${apiUrl}/${resource}/${id}/status`;
    const result = await httpClient(url, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });

    return {
      data: mapIdIfCards(resource, result.json),
    };
  },

  updateActive: async (resource: string, id: number, active: boolean) => {
    const url = `${apiUrl}/${resource}/${id}/active`;
    const result = await httpClient(url, {
      method: "PATCH",
      body: JSON.stringify({ active }),
    });

    return {
      data: mapIdIfCards(resource, result.json),
    };
  },
};

export default dataProvider;
