import { CareProfessional } from "../../careProfessional/entities/CareProfessional";


export interface DetailedReview {
  idReview: number;
  rating: number;
  comment?: string;
  idCareProfessional: number;
  createdAt: Date;
  updatedAt: Date;
  patient: {
    id: number;
    name: string;
    urlImage?: string | null;
  };
};