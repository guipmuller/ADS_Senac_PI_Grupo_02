export interface GetPatientResponse {
  id: number;
  idUser: number;
  patientName: string;
  patientCpf: string;
  patientBirthDate: Date;
  user: {
    id: number;
    name: string;
    urlImage: string
  }
}