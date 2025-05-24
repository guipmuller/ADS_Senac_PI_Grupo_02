import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AddressRepository } from "../repositories/AddressRepository";
import { PatientRepository } from "../repositories/PatientRepository";
import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { Appointment } from "../models/appointment/entities/Appointment";
import { PostAppointmentRequest } from "../models/appointment/dtos/PostAppointmentRequest";
import { PutAppointmentRequest } from "../models/appointment/dtos/PutAppointmentRequest";

export class AppointmentService {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private addressRepository: AddressRepository,
    private patientRepository: PatientRepository,
    private careProfessionalRepository: CareProfessionalRepository
  ) {}

  async getAllAppointments(
    idCareProfessional: number | undefined,
    idPatient: number | undefined
  ): Promise<Appointment[]> {
    const where: any = {};
    if (idCareProfessional) where.idCareProfessional = idCareProfessional;
    if (idPatient) where.idPatient = idPatient;
    return this.appointmentRepository.findAll({ where });
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
