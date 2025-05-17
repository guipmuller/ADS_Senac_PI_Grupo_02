import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { CareProfessional } from "../models/entities/CareProfessional";

export class CareProfessionalService {
  constructor(private careProfessionalRepository: CareProfessionalRepository) {}

  getAllCareProfessionals() {
    return this.careProfessionalRepository.findAll();
  }

  getCareProfessionalById(id: number) {
    return this.careProfessionalRepository.findById(id)
  }

  createCareProfessionals(careProfessionalData: Partial<CareProfessional>) {
    return this.careProfessionalRepository.create(careProfessionalData)
  }

  updateCareProfessionals(id: number, careProfessionalData: Partial<CareProfessional>) {
    return this.careProfessionalRepository.update(id, careProfessionalData)
  }

  deleteCareProfessionals(id: number) {
    return this.careProfessionalRepository.delete(id);
  }
}