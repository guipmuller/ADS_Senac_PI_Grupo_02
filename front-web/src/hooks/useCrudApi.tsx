import api from "../services/api"

export interface CreatedResponse {
  id: number;
}

export function useCrudApi<T>(resource: string) {
  const getAll = () => api.get<T[]>(`/${resource}`);
  const getById = (id: string) => api.get<T>(`/${resource}/${id}}`);
  const create = (data: T) => api.post<CreatedResponse>(`/${resource}`, data);
  const update = (id: string, data: T) => api.put(`/${resource}/${id}}`, data);
  const remove = (id: string) => api.delete(`/${resource}/${id}}`);

  return { getAll, getById, create, update, remove }
}