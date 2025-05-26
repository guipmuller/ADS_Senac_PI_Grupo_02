import api from "@/services/api";
import { useCrudApi } from "../useCrudApi";

export interface Professional {
  id?: number | null; // somente é preechido em operações GET. POST e PUT passar nulos
  idUser?: number;
  professionalRegistryCode: string;
  professionalBiography: string;
  rating?: number;
  user?: { // Complemento para trazer dados simplificados de usuário numa mesma chamada. Não passar em caso de POST ou PUT
    id: number;
    name: string;
    urlImage?: string
  }
}

export function useCareProfessionalsApi() {
  const crud = useCrudApi<Professional>('care-professionals');

  const getByUserId = (id: string) => api.get<Professional>(`care-professionals/user/${id}`);

  return { ...crud, getByUserId };
}