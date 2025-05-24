import { AppointmentStatus } from "../enums/AppointmentStatus";

export interface GetAppointmentResponse {
  id: number,
  scheduledAt: Date,
  idAddress: number,
  idPatient: number,
  idCareProfessional: number,
  status: AppointmentStatus
}