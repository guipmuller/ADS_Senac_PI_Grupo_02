import { useCrudApi } from "../useCrudApi";

export interface Appointment {
  id?: number | null, // somente é preechido em operações GET. POST passar nulo
  scheduledAt: Date,
  idAddress: number,
  idPatient: number,
  idCareProfessional: number,
  status: string
}

export interface UpdateAppointment {
  scheduledAt: Date,
  status: string,
  idAddress: number
}

export function useAppointmentsApi() {
  return useCrudApi<Appointment, UpdateAppointment>("appointments");
}
