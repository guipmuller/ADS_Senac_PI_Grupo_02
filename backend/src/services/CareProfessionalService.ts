import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { CareProfessional } from "../models/careProfessional/entities/CareProfessional";
import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { PatientRepository } from "../repositories/PatientRepository";
import { DetailedCareProfessional } from "../models/careProfessional/dtos/DetailedCareProfessional";

export class CareProfessionalService {
  constructor(
    private careProfessionalRepository: CareProfessionalRepository,
    private patientRepository: PatientRepository,
    private userRepository: UserRepository
  ) {}

  async getAllCareProfessionals(): Promise<DetailedCareProfessional[]> {
    const careProfs = await this.careProfessionalRepository.findAll();

    const detailedCareProfessional = await Promise.all(
      careProfs.map(async (careProf) => {
        try {
          const user = await this.userRepository.findById(careProf.idUser);
          if (!user) throw new Error("User not found");

          return {
            ...careProf,
            user: {
              id: user.idUser,
              name: user.name,
              urlImage: user.urlImage,
            },
          } as DetailedCareProfessional;
        } catch (e) {
          console.error("Error processing Care Professional:", e);
          return null;
        }
      })
    );

    return detailedCareProfessional.filter(
      (p): p is DetailedCareProfessional => p !== null
    );
  }

  async getCareProfessionalById(
    id: number
  ): Promise<DetailedCareProfessional | null> {
    const careProf = await this.careProfessionalRepository.findById(id);
    if (!careProf) throw new NotFoundError("Care Professional not found");

    const user = await this.userRepository.findById(careProf.idUser);
    if (!user) throw new Error("User not found");

    return {
      ...careProf,
      user: {
        id: user.idUser,
        name: user.name,
        urlImage: user.urlImage,
      },
    } as DetailedCareProfessional;
  }

  async getCareProfessionalByIdUser(idUser: number): Promise<DetailedCareProfessional | null> {
    const user = await this.userRepository.findById(idUser);
    if (!user) throw new Error("User not found");

    const careProf = await this.careProfessionalRepository.findByUserId(idUser);
    if (!careProf) throw new NotFoundError("Care Professional not found");
    
    return {
      ...careProf,
      user: {
        id: user.idUser,
        name: user.name,
        urlImage: user.urlImage,
      },
    } as DetailedCareProfessional;
  }

  async createCareProfessionals(data: Partial<CareProfessional>) {
    const user = await this.userRepository.findById(data.idUser!);
    if (!user) throw new NotFoundError("User not found.");
    const associatedPatient = await this.patientRepository.findByUserId(
      user.idUser
    );
    const associatedCareProfessional =
      await this.careProfessionalRepository.findByUserId(user.idUser);
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
