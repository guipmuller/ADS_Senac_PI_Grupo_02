import { useCrudApi } from "../useCrudApi";

export interface Patient {
  id: number;
  idUser: number;
  patientName: string;
  patientCpf: string;
  patientBirthDate: string;
}

export function usePatientsApi() {
  return useCrudApi<Patient>('patients');
}