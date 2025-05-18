import { AppointmentStatus } from "../enums/AppointmentStatus";

export interface GetAppointmentResponse {
  id: number,
  scheduledAt: Date,
  idAdress: number,
  idPatient: number,
  idCareProfessional: number,
  status: AppointmentStatus
}