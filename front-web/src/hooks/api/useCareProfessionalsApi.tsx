import { useCrudApi } from "../useCrudApi";

export interface Professional {
  id?: number | null; // somente é preechido em operações GET. POST e PUT passar nulos
  idUser: number;
  professionalRegistryCode: string;
  professionalBiography: string;
  rating?: number;
}

export function useCareProfessionalsApi() {
  return useCrudApi<Professional>('care-professionals');
}