import { Body, Controller, Get, Path, Post, Put, Delete, Route, Tags, } from "tsoa";
import { CareProfessionalService } from "../services/CareProfessionalService";
import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { AppDataSource } from "../database/data-source";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { PatientRepository } from "../repositories/PatientRepository";
import { GetCareProfessionalResponse } from "../models/careProfessional/dtos/GetCareProfessionalResponse";
import { CareProfessionalRequest } from "../models/careProfessional/dtos/CareProfessionalRequest";
import { CreateResponse } from "../models/shared/CreateResponse";
import { DetailedCareProfessional } from "../models/careProfessional/dtos/DetailedCareProfessional";

const careProfessionalRepository = new CareProfessionalRepository(
  AppDataSource
);
const patientRepository = new PatientRepository(AppDataSource);
const userRepository = new UserRepository(AppDataSource);
const careProfessionalService = new CareProfessionalService(
  careProfessionalRepository,
  patientRepository,
  userRepository
);
const userService = new UserService(userRepository);

function toGetCareProfessionalResponse(
  entity: any
): GetCareProfessionalResponse {
  return {
    id: entity.idCareProfessional,
    professionalRegistryCode: entity.professionalRegistryCode,
    professionalBiography: entity.professionalBiography,
    rating: entity.rating,
    user: {
      id: entity.user.id,
      name: entity.user.name,
      urlImage: entity.user.urlImage
    }
  };
}
@Route("care-professionals")
@Tags("CareProfessionals")
export class CareProfessionalController extends Controller {
  /**
   * @summary Busca a lista de todos os cuidadores da base
   * @returns Lista de todos os cuidadores e seus dados
   */
  @Get("/")
  public async getAllCareProfessinals(): Promise<
    GetCareProfessionalResponse[]
  > {
    const careProfessional =
      await careProfessionalService.getAllCareProfessionals();
    return careProfessional.map(toGetCareProfessionalResponse);
  }
  /**
   * @summary Busca um cuidador específico pelo seu ID
   * @returns Retorna os dados do cuidador consultado
   */
  @Get("/{id}")
  public async getCareProfessinalById(
    @Path() id: number
  ): Promise<GetCareProfessionalResponse> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid CareProfessional id: ${id}`);
    }
    const careProfessional =
      await careProfessionalService.getCareProfessionalById(id);
    if (!careProfessional) {
      this.setStatus(404);
      throw new Error("CareProfessional not found");
    }
    return toGetCareProfessionalResponse(careProfessional);
  }
  /**
   * @summary Busca um cuidador específico pelo ID do usuário associado
   * @returns Retorna os dados do cuidador consultado
   */
  @Get("/user/{idUser}")
  public async getCareProfessinalByUserId(
    @Path() idUser: number
  ): Promise<GetCareProfessionalResponse> {
    if (isNaN(idUser)) {
      this.setStatus(400);
      throw new Error(`Invalid User id: ${idUser}`);
    }
    const careProfessional =
      await careProfessionalService.getCareProfessionalByIdUser(idUser);
    if (!careProfessional) {
      this.setStatus(404);
      throw new Error("CareProfessional not found");
    }
    return toGetCareProfessionalResponse(careProfessional);
  }
  /**
   * @summary Cria um novo cadastro de cuidador na base
   * @returns Retorna o ID do cadastro criado
   */
  @Post("/")
  public async createCareProfessinal(
    @Body() careProfessionalData: CareProfessionalRequest
  ): Promise<CreateResponse> {
    const userExists = await userService.getUserById(
      careProfessionalData.idUser
    );
    const careProfessional =
      await careProfessionalService.createCareProfessionals(
        careProfessionalData
      );
    this.setStatus(201);
    return { id: careProfessional.idCareProfessional };
  }
  /**
   * @summary Atualiza o cadastro de cuidador na base
   */
  @Put("/{id}")
  public async updateCareProfessinal(
    @Path() id: number,
    @Body() careProfessionalData: CareProfessionalRequest
  ): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid CareProfessional id: ${id}`);
    }
    const updated = await careProfessionalService.updateCareProfessionals(
      id,
      careProfessionalData
    );
    if (!updated) {
      this.setStatus(404);
      throw new Error("CareProfessional not found");
    }
    this.setStatus(204);
  }
  /**
   * @summary Remove o resgistro de um paciente da base
   */
  @Delete("/{id}")
  public async deleteCareProfessinal(@Path() id: number): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid CareProfessional id: ${id}`);
    }

    const deleted = await careProfessionalService.deleteCareProfessionals(id);
    if (!deleted) {
      this.setStatus(404);
      throw new Error("CareProfessional not found");
    }
    this.setStatus(204);
    return;
  }
}
