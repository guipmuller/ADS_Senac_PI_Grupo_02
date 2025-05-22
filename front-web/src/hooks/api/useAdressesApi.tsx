import { useCrudApi } from "../useCrudApi";

export interface Review {
  id: number;
  rating: number;
  comment: string;
  idCareProfessional: number;
  idPatient: number
}

export function useAddressesApi() {
  return useCrudApi<Review>('addresses');
}