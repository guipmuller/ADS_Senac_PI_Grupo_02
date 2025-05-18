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
import { PatientService } from "../services/PatientService";
import { PatientRepository } from "../repositories/PatientRepository";
import { AppDataSource } from "../database/data-source";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { PatientRequest } from "../models/dtos/PatientRequest";
import { GetPatientResponse } from "../models/dtos/GetPatientResponse";
import { CreateResponse } from "../models/dtos/CreateResponse";

const patientRepository = new PatientRepository(AppDataSource);
const patientService = new PatientService(patientRepository);
const userRepository = new UserRepository(AppDataSource);
const userService = new UserService(userRepository);

function toGetPatientResponse(patient: any): GetPatientResponse {
  return {
    id: patient.idPatient,
    idUser: patient.idUser,
    patientName: patient.patientName,
    patientCpf: patient.patientCpf,
    patientBirthDate: patient.patientBirthDate,
  };
}
@Route("patients")
@Tags("Patients")
export class PatientController extends Controller {
  @Get("/")
  public async getAllPatients(): Promise<GetPatientResponse[]> {
    const patient = await patientService.getAllPatients();
    return patient.map(toGetPatientResponse);
  }

  @Get("/{id}")
  public async getPatientById(@Path() id: number): Promise<GetPatientResponse> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid patient id: ${id}`);
    }
    const patient = await patientService.getPatientById(id);
    if (!patient) {
      this.setStatus(404);
      throw new Error("Patient not found");
    }
    return toGetPatientResponse(patient);
  }

  @Post("/")
  public async createPatient(
    @Body() patientData: PatientRequest
  ): Promise<CreateResponse> {
    const userExists = await userService.getUserById(patientData.idUser);
    if (!userExists) {
      this.setStatus(404);
      throw new Error("User not found");
    }
    const patient = await patientService.createPatient(patientData);
    this.setStatus(201);
    return { id: patient.idPatient };
  }

  @Put("/{id}")
  public async updatePatient(
    @Path() id: number,
    @Body() patientData: PatientRequest
  ): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid patient id: ${id}`);
    }
    const updated = await patientService.updatePatient(id, patientData);
    if (!updated) {
      this.setStatus(404);
      throw new Error(`There is no patient associated with id ${id}.`);
    }
    this.setStatus(204);
  }

  @Delete("/{id}")
  public async deletePatient(@Path() id: number): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid patient id: ${id}`);
    }

    const deleted = await patientService.deletePatient(id);
    if (!deleted) {
      this.setStatus(404);
      throw new Error("Patient not found");
    }
    this.setStatus(204);
  }
}
