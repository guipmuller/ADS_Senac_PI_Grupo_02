import { DataSource, Repository } from "typeorm";
import { Patient } from "../models/entities/Patient";

export class PatientRepository {
  private repo: Repository<Patient>

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Patient);
  }

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOneBy({ idPatient: id });
  }

  create(patientData: Partial<Patient>) {
      const patient = this.repo.create(patientData);
      return this.repo.save(patient);
    }
  
    async update(id: number, patientData: Partial<Patient>) {
      await this.repo.update(id, patientData);
      return this.findById(id);
    }
  
    delete(id: number) {
      return this.repo.delete(id);
    }
}