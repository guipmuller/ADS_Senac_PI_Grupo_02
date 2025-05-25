import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AddressRepository } from "../repositories/AddressRepository";
import { PatientRepository } from "../repositories/PatientRepository";
import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { PostAppointmentRequest } from "../models/dtos/PostAppointmentRequest";
import { NotFoundError } from "../errors/NotFoundError";
import { PutAppointmentRequest } from "../models/dtos/PutAppointmentRequest";

export class AppointmentService {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private addressRepository: AddressRepository,
    private patientRepository: PatientRepository,
    private careProfessionalRepository: CareProfessionalRepository
  ) {}

  getAllAppointments() {
    return this.appointmentRepository.findAll();
  }

  getAppointmentById(id: number) {
    return this.appointmentRepository.findById(id);
  }

  async createAppointments(appointmentData: PostAppointmentRequest) {
    const address = await this.addressRepository.findById(
      appointmentData.idAdress
    );
    if (!address) throw new NotFoundError("Address not found.");
  
    const patient = await this.patientRepository.findById(
      appointmentData.idPatient
    );
    if (!patient) throw new NotFoundError("Patient not found.");

    const careProfessional = await this.careProfessionalRepository.findById(
      appointmentData.idCareProfessional
    );
    if (!careProfessional) throw new NotFoundError("Care professional not found.");

    return this.appointmentRepository.createAndSave({
      scheduledAt: appointmentData.scheduledAt,
      idPatient: appointmentData.idPatient,
      idCareProfessional: appointmentData.idCareProfessional,
      //idAddress: appointmentData.idAdress,
      address,
      patient,
      careProfessional,
    });
  }

  async updateAppointments(id: number, appointmentData: PutAppointmentRequest) {
    const address = await this.addressRepository.findById(
      appointmentData.idAdress
    );
    if (!address) throw new Error("Address not found.");

    const updated = await this.appointmentRepository.update(id, {
      scheduledAt: appointmentData.scheduledAt,
      status: appointmentData.status,
      address
    });

    if (!updated) return null;

    return updated;
  }

  deleteAppointments(id: number) {
    return this.appointmentRepository.delete(id);
  }
}
