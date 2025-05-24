import { CareProfessional } from "../../careProfessional/entities/CareProfessional";


export interface DetailedReview {
  idReview: number;
  rating: number;
  comment?: string;
  idPatient: number;
  idCareProfessional: number;
  createdAt: Date;
  updatedAt: Date;
  careProfessional: CareProfessional;
  patient: {
    id: number;
    name: string;
    urlImage?: string | null;
  };
};