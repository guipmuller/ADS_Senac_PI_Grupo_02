import { useCrudApi } from "../useCrudApi";

export interface Review {
  id?: number | null; // somente é preechido em operações GET. POST e PUT passar nulos
  rating: number;
  comment: string;
  idCareProfessional: number;
  idPatient: number;
}

export function useReviewsApi() {
  return useCrudApi<Review>('reviews');
}