import { useCrudApi } from "../useCrudApi";

export interface Patient {
  id?: number | null; // somente é preechido em operações GET. POST e PUT passar nulos
  idUser: number;
  patientName: string;
  patientCpf: string;
  patientBirthDate: string;
}

export function usePatientsApi() {
  return useCrudApi<Patient>('patients');
}