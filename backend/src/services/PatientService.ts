import { PatientRepository } from "../repositories/PatientRepository";
import { Patient } from "../models/entities/Patient";

export class PatientService {
  constructor(private patientRepository: PatientRepository) {}

  getAllPatients() {
    return this.patientRepository.findAll();
  }

  getPatientById(id: number) {
    return this.patientRepository.findById(id);
  }

  createPatient(patientData: Partial<Patient>) {
    return this.patientRepository.create(patientData)
  }

  updatePatient(id: number, patientData: Partial<Patient>) {
    return this.patientRepository.update(id, patientData);
  }

  deletePatient(id: number) {
    return this.patientRepository.delete(id);
  }
}