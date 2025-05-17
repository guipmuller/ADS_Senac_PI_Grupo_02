import { DataSource, Repository } from "typeorm";
import { CareProfessional } from "../models/entities/CareProfessional";

export class CareProfessionalRepository {
  private repo: Repository<CareProfessional>

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(CareProfessional);
  }

  findAll() {
    return this.repo.find()
  }

  findById(id: number) {
    return this.repo.findOneBy({ idCareProfessional : id })
  }

  create(careProfessionalData: Partial<CareProfessional>) {
    const careProfessional = this.repo.create(careProfessionalData)
    return this.repo.save(careProfessional)
  }

  async update(id: number, careProfessionalData: Partial<CareProfessional>) {
    await this.repo.update(id, careProfessionalData)
    return this.findById(id)
  }

  delete(id: number) {
    return this.repo.delete(id)
  }
}