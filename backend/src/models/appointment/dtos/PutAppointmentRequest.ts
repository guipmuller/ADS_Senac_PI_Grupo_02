import { AppointmentStatus } from "../enums/AppointmentStatus"

export interface PutAppointmentRequest {
  scheduledAt: Date,
  status: AppointmentStatus,
  idAdress: number
}