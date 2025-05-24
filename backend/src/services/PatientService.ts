import { PatientRepository } from "../repositories/PatientRepository";
import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { Patient } from "../models/patient/entities/Patient";

export class PatientService {
  constructor(
    private patientRepository: PatientRepository,
    private careProfessionalRepository: CareProfessionalRepository,
    private userRepository: UserRepository
  ) {}

  getAllPatients() {
    return this.patientRepository.findAll();
  }

  getPatientById(id: number) {
    return this.patientRepository.findById(id);
  }

  getPatientByUserId(id: number) {
    return this.patientRepository.findByUserId(id);
  }

  async createPatient(patientData: Partial<Patient>) {
    const user = await this.userRepository.findById(patientData.idUser!);
    if (!user) throw new NotFoundError("User not found.");
    const associatedPatient = await this.patientRepository.findByUserId(
      user.idUser
    );
    const associatedCareProfessional = await this.careProfessionalRepository.findByUserId(
      user.idUser
    );
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
