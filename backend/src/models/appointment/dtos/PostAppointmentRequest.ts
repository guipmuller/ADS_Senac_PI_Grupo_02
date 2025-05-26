export interface PostAppointmentRequest {
  scheduledAt: Date,
  idPatient: number,
  idCareProfessional: number,
  idAddress: number
}