import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { Appointment } from "../models/entities/Appointment";

export class AppointmentService {
  constructor(private appointmentRepository: AppointmentRepository) {}

  getAllAppointments() {
      return this.appointmentRepository.findAll();
    }
  
    getAppointmentById(id: number) {
      return this.appointmentRepository.findById(id)
    }
  
    createAppointments(appointmentData: Partial<Appointment>) {
      return this.appointmentRepository.create(appointmentData)
    }
  
    updateAppointments(id: number, appointmentData: Partial<Appointment>) {
      return this.appointmentRepository.update(id, appointmentData)
    }
  
    deleteAppointments(id: number) {
      return this.appointmentRepository.delete(id);
    }
}