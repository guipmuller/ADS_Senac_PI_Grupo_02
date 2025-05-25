import { useCrudApi } from "../useCrudApi";

export interface Appointment {
  id: number,
  scheduledAt: Date,
  status: string,
  patient: {
    id: number,
    name: string,
    phoneNumber: string
  },
  careProfessional: {
    id: number,
    name: string,
    phoneNumber: string
  },
  address: {
    id: number;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }
}

export interface UpdateAppointment {
  scheduledAt: Date,
  status: string,
  idAddress: number
}

export interface CreateAppointment {
  scheduledAt: Date,
  idPatient: number,
  idCareProfessional: number,
  idAddress: number
}

export function useAppointmentsApi() {
  return useCrudApi<Appointment, CreateAppointment, UpdateAppointment>("appointments");
}
