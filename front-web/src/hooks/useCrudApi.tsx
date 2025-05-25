import api from "../services/api"

export interface CreatedResponse {
  id: number;
}

export function useCrudApi<T, U = T, V = U>(resource: string) {
  const getAll = (params?: Record<string, unknown>) => api.get<T[]>(`/${resource}`, params);
  const getById = (id: number) => api.get<T>(`/${resource}/${id}`);
  const create = (data: U) => api.post<CreatedResponse>(`/${resource}`, data);
  const update = (id: number, data: V) => api.put(`/${resource}/${id}`, data);
  const remove = (id: number) => api.delete(`/${resource}/${id}`);

  return { getAll, getById, create, update, remove }
}