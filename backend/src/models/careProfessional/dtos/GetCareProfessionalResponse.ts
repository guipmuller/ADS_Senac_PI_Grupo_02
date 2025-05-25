export interface GetCareProfessionalResponse {
  id: number;
  professionalRegistryCode: string;
  professionalBiography: string;
  rating?: number;
  user: {
    id: number;
    name: string;
    urlImage?: string | null
  }
}