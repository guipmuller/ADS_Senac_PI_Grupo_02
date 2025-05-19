import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AddressRepository } from "../repositories/AddressRepository";
import { PatientRepository } from "../repositories/PatientRepository";
import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { AppointmentRequest } from "../models/dtos/AppointmentRequest";

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

  async createAppointments(appointmentData: AppointmentRequest) {
    const address = await this.addressRepository.findById(
      appointmentData.idAdress
    );
    const patient = await this.patientRepository.findById(
      appointmentData.idPatient
    );
    const careProfessional = await this.careProfessionalRepository.findById(
      appointmentData.idCareProfessional
    );

    if (!address || !patient || !careProfessional) {
      throw new Error(
        "Invalid relationship: address, patient or professional not found."
      );
    }

    return this.appointmentRepository.createAndSave({
      scheduledAt: appointmentData.scheduledAt,
      idPatient: appointmentData.idPatient,
      idCareProfessional: appointmentData.idCareProfessional,
      idAddress: appointmentData.idAdress,
      address,
      patient,
      careProfessional,
    });
  }

  async updateAppointments(id: number, appointmentData: AppointmentRequest) {
    const address = await this.addressRepository.findById(
      appointmentData.idAdress
    );
    const patient = await this.patientRepository.findById(
      appointmentData.idPatient
    );
    const careProfessional = await this.careProfessionalRepository.findById(
      appointmentData.idCareProfessional
    );

    if (!address || !patient || !careProfessional) {
      throw new Error(
        "Invalid relationship: address, patient or professional not found."
      );
    }

    return this.appointmentRepository.update(id, {
      scheduledAt: appointmentData.scheduledAt,
      idPatient: appointmentData.idPatient,
      idCareProfessional: appointmentData.idCareProfessional,
      idAddress: appointmentData.idAdress,
      address,
      patient,
      careProfessional,
    });
  }

  deleteAppointments(id: number) {
    return this.appointmentRepository.delete(id);
  }
}
