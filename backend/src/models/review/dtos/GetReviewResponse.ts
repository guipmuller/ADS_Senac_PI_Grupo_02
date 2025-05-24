export interface GetReviewResponse {
  id: number;
  rating: number;
  comment: string;
  idCareProfessional: number;
  patient: {
    id: number;
    name: string;
    urlImage?: string | null
  }
}