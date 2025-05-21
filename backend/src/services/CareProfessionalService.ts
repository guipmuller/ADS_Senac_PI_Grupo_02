import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { CareProfessional } from "../models/entities/CareProfessional";
import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { PatientRepository } from "../repositories/PatientRepository";

export class CareProfessionalService {
  constructor(
    private careProfessionalRepository: CareProfessionalRepository,
    private patientRepository: PatientRepository,
    private userRepository: UserRepository
  ) {}

  getAllCareProfessionals() {
    return this.careProfessionalRepository.findAll();
  }

  getCareProfessionalById(id: number) {
    return this.careProfessionalRepository.findById(id);
  }

  async createCareProfessionals(data: Partial<CareProfessional>) {
    const user = await this.userRepository.findById(data.idUser!);
    if (!user) throw new NotFoundError("User not found.");
    const associatedPatient = await this.patientRepository.findByUserId(
      user.idUser
    );
    const associatedCareProfessional = await this.careProfessionalRepository.findByUserId(
      user.idUser
    );
    if (associatedPatient || associatedCareProfessional)
      throw new Error("User already associated.");

    return this.careProfessionalRepository.create(data);
  }

  updateCareProfessionals(
    id: number,
    careProfessionalData: Partial<CareProfessional>
  ) {
    return this.careProfessionalRepository.update(id, careProfessionalData);
  }

  deleteCareProfessionals(id: number) {
    return this.careProfessionalRepository.delete(id);
  }
}
