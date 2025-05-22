import { useCrudApi } from "../useCrudApi";

export interface Review {
  id: number;
  rating: number;
  comment: string;
  idCareProfessional: number;
  idPatient: number;
}

export function useCareReviewsApi() {
  return useCrudApi<Review>('reviews');
}