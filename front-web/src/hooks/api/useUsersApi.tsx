import api from '../../services/api';
import { useCrudApi } from '../useCrudApi';

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  urlImage?: string | null;
  isPatient: boolean
}

export function useUsersApi() {
  const crud = useCrudApi<User>('users');

  const getByFirebaseToken = () => api.get<User>('/users/firebase');

  return { ...crud, getByFirebaseToken };
}