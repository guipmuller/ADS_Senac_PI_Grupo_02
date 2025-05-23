import { useCrudApi } from "../useCrudApi";

export interface Appointment {
  id: number,
  scheduledAt: Date,
  idAddress: number,
  idPatient: number,
  idCareProfessional: number,
  status: string
}

export function useAppointmentsApi() {
  return useCrudApi<Appointment>("appointments");
}
