export interface AppointmentRequest {
  scheduledAt: Date,
  idPatient: number,
  idCareProfessional: number,
  idAdress: number
}