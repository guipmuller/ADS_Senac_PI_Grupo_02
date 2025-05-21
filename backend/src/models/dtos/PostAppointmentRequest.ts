export interface PostAppointmentRequest {
  scheduledAt: Date,
  idPatient: number,
  idCareProfessional: number,
  idAdress: number
}