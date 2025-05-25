import { PatientRepository } from "../repositories/PatientRepository";
import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { Patient } from "../models/patient/entities/Patient";
import { GetPatientResponse } from "../models/patient/dtos/GetPatientResponse";

export class PatientService {
  constructor(
    private patientRepository: PatientRepository,
    private careProfessionalRepository: CareProfessionalRepository,
    private userRepository: UserRepository
  ) {}

  async getAllPatients(): Promise<GetPatientResponse[]> {
    const patients = await this.patientRepository.findAll();
    const detailedPatient = await Promise.all(
      patients.map(async (patient) => {
        try {
          const user = await this.userRepository.findById(patient.idUser);
          if (!user) throw new NotFoundError("User not found");

          return {
            id: patient.idPatient,
            patientName: patient.patientName,
            patientCpf: patient.patientCpf,
            patientBirthDate: patient.patientBirthDate,
            user: {
              id: user.idUser,
              name: user.name,
              urlImage: user.urlImage,
            },
          };
        } catch (e) {
          console.error("Error processing patient:", e);
          return null;
        }
      })
    );
    return detailedPatient.filter((p): p is GetPatientResponse => p !== null);
  }

  async getPatientById(id: number): Promise<GetPatientResponse | null> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) throw new NotFoundError("Patient not found");
    const user = await this.userRepository.findById(patient.idUser);
    if (!user) throw new NotFoundError("User not found");

    return {
      id: patient.idPatient,
      patientName: patient.patientName,
      patientCpf: patient.patientCpf,
      patientBirthDate: patient.patientBirthDate,
      user: {
        id: user.idUser,
        name: user.name,
        urlImage: user.urlImage,
      },
    } as GetPatientResponse;
  }

  async getPatientByUserId(idUser: number) {
    const user = await this.userRepository.findById(idUser);
    if (!user) throw new Error("User not found");
    const patient = await this.patientRepository.findByUserId(idUser);
    if (!patient) throw new NotFoundError("Patient not found");

    return {
      id: patient.idPatient,
      patientName: patient.patientName,
      patientCpf: patient.patientCpf,
      patientBirthDate: patient.patientBirthDate,
      user: {
        id: user.idUser,
        name: user.name,
        urlImage: user.urlImage,
      },
    } as GetPatientResponse;
  }

  async createPatient(patientData: Partial<Patient>) {
    const user = await this.userRepository.findById(patientData.idUser!);
    if (!user) throw new NotFoundError("User not found.");
    const associatedPatient = await this.patientRepository.findByUserId(
      user.idUser
    );
    const associatedCareProfessional =
      await this.careProfessionalRepository.findByUserId(user.idUser);
    if (associatedPatient || associatedCareProfessional)
      throw new Error("User already associated.");

    return this.patientRepository.create(patientData);
  }

  updatePatient(id: number, patientData: Partial<Patient>) {
    return this.patientRepository.update(id, patientData);
  }

  deletePatient(id: number) {
    return this.patientRepository.delete(id);
  }
}
