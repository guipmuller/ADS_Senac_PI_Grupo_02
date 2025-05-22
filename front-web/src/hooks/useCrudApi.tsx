import api from "../services/api"

export default function userCrudApi(resource: string) {
  const getAll = () => api.get(`/${resource}`);
  const getById = (id: string) => api.get(`/${resource}/${id}}`);
  const create = (data: unknown) => api.post(`/${resource}`, data);
  const update = (id: string, data: unknown) => api.post(`/${resource}/${id}}`, data);
  const remove = (id: string) => api.delete(`/${resource}/${id}}`);

  return { getAll, getById, create, update, remove }
}