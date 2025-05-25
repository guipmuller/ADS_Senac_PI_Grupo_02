import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AddressRepository } from "../repositories/AddressRepository";
import { PatientRepository } from "../repositories/PatientRepository";
import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { PostAppointmentRequest } from "../models/appointment/dtos/PostAppointmentRequest";
import { PutAppointmentRequest } from "../models/appointment/dtos/PutAppointmentRequest";
import { GetAppointmentResponse } from "../models/appointment/dtos/GetAppointmentResponse";
import { UserRepository } from "../repositories/UserRepository";

export class AppointmentService {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private addressRepository: AddressRepository,
    private patientRepository: PatientRepository,
    private careProfessionalRepository: CareProfessionalRepository,
    private userRepository: UserRepository
  ) {}

  async getAllAppointments(
    idCareProfessional: number | undefined,
    idPatient: number | undefined
  ): Promise<GetAppointmentResponse[]> {
    const where: any = {};
    if (idCareProfessional) where.idCareProfessional = idCareProfessional;
    if (idPatient) where.idPatient = idPatient;
    const appointments = await this.appointmentRepository.findAll({ where });

    const detailedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        try {
          const patient = await this.patientRepository.findById(
            appointment.idPatient
          );
          if (!patient) throw new NotFoundError("Patient not found");

          const userPatient = await this.userRepository.findById(
            patient.idUser
          );
          if (!userPatient) throw new NotFoundError("Patient user not found");

          const professional = await this.careProfessionalRepository.findById(
            appointment.idCareProfessional
          );
          if (!professional) throw new NotFoundError("Professional not found");

          const userProf = await this.userRepository.findById(
            professional.idUser
          );
          if (!userProf) throw new NotFoundError("Professional user not found");

          const address = await this.addressRepository.findById(
            appointment.idAddress
          );
          if (!address) throw new NotFoundError("Address not found");

          return {
            id: appointment.idAppointment,
            scheduledAt: appointment.scheduledAt,
            status: appointment.status,
            patient: {
              id: patient.idPatient,
              name: userPatient.name,
              phoneNumber: userPatient.phoneNumber,
            },
            careProfessional: {
              id: professional.idCareProfessional,
              name: userProf.name,
              phoneNumber: userProf.phoneNumber,
            },
            address: {
              id: address.idAddress,
              street: address.street,
              number: address.number,
              complement: address.complement,
              neighborhood: address.neighborhood,
              city: address.city,
              state: address.state,
              postalCode: address.postalCode,
              country: address.country,
            },
          } as GetAppointmentResponse;
        } catch (e) {
          console.error("Error processing appointment:", e);
          return null;
        }
      })
    );
    return detailedAppointments.filter(
      (a): a is GetAppointmentResponse => a !== null
    );
  }

  async getAppointmentById(id: number): Promise<GetAppointmentResponse | null> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) throw new NotFoundError("Appointment not found");

    const address = await this.addressRepository.findById(
      appointment.idAddress
    );
    if (!address) throw new NotFoundError("Address not found");

    const patient = await this.patientRepository.findById(
      appointment.idPatient
    );
    if (!patient) throw new NotFoundError("Patient not found");

    const userPatient = await this.userRepository.findById(patient.idUser);
    if (!userPatient) throw new NotFoundError("Patient user not found");

    const professional = await this.careProfessionalRepository.findById(
      appointment.idCareProfessional
    );
    if (!professional) throw new NotFoundError("Professional not found");

    const userProf = await this.userRepository.findById(professional.idUser);
    if (!userProf) throw new NotFoundError("Professional user not found");

    return {
      id: appointment.idAppointment,
      scheduledAt: appointment.scheduledAt,
      status: appointment.status,
      patient: {
        id: patient.idPatient,
        name: userPatient.name,
        phoneNumber: userPatient.phoneNumber,
      },
      careProfessional: {
        id: professional.idCareProfessional,
        name: userProf.name,
        phoneNumber: userProf.phoneNumber,
      },
      address: {
        id: address.idAddress,
        street: address.street,
        number: address.number,
        complement: address.complement,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      },
    } as GetAppointmentResponse;
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
    if (!careProfessional)
      throw new NotFoundError("Care professional not found.");

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
      address,
    });

    if (!updated) return null;

    return updated;
  }

  deleteAppointments(id: number) {
    return this.appointmentRepository.delete(id);
  }
}
