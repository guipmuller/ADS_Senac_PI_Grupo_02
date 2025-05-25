import { AppointmentStatus } from "../enums/AppointmentStatus";

export interface GetAppointmentResponse {
  id: number,
  scheduledAt: Date,
  status: AppointmentStatus
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
  },
}