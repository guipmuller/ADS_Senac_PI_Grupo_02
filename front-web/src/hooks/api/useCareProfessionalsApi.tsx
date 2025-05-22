import { useCrudApi } from "../useCrudApi";

export interface Professional {
  id: number;
  idUser: number;
  professionalRegistryCode: string;
  professionalBiography: string;
  rating?: number;
}

export function useCareProfessionalsApi() {
  return useCrudApi<Professional>('care-professionals');
}