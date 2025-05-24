export interface ReviewRequest {
  rating: number;
  comment: string;
  idCareProfessional: number;
  idPatient: number;
}