export interface DetailedCareProfessional {
  idCareProfessional: number,
  idUser: number;
   professionalRegistryCode: string;
   professionalBiography: string;
  rating?: number,
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number,
    name: string,
    urlImage: string
  }
}