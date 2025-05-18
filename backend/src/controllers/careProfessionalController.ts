import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Delete,
  Route,
  Tags,
} from "tsoa";
import { CareProfessionalService } from "../services/CareProfessionalService";
import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { AppDataSource } from "../database/data-source";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { CareProfessionalRequest } from "../models/dtos/CareProfessionalRequest";
import { GetCareProfessionalResponse } from "../models/dtos/GetCareProfessionalResponse";
import { CreateResponse } from "../models/dtos/CreateResponse";

const careProfessionalRepository = new CareProfessionalRepository(
  AppDataSource
);
const careProfessionalService = new CareProfessionalService(
  careProfessionalRepository
);
const userRepository = new UserRepository(AppDataSource);
const userService = new UserService(userRepository);

function toGetCareProfessionalResponse(
  entity: any
): GetCareProfessionalResponse {
  return {
    id: entity.idCareProfessional,
    idUser: entity.idUser,
    professionalRegistryCode: entity.professionalRegistryCode,
    professionalBiography: entity.professionalBiography,
    rating: entity.rating,
  };
}
@Route("care-professionals")
@Tags("CareProfessionals")
export class CareProfessionalController extends Controller {
  @Get("/")
  public async getAllCareProfessinals(): Promise<GetCareProfessionalResponse[]> {
    const careProfessional =
      await careProfessionalService.getAllCareProfessionals();
    return careProfessional.map(toGetCareProfessionalResponse);
  }

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

  @Post("/")
  public async createCareProfessinal(
    @Body() careProfessionalData: CareProfessionalRequest
  ): Promise<CreateResponse> {
    const userExists = await userService.getUserById(
      careProfessionalData.idUser
    );
    if (!userExists) {
      this.setStatus(404);
      throw new Error("User not found");
    }

    const careProfessional =
      await careProfessionalService.createCareProfessionals(
        careProfessionalData
      );
    this.setStatus(201);
    return { id: careProfessional.idCareProfessional };
  }

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