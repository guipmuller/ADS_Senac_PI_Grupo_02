import { Body, Controller, Get, Path, Post, Put, Delete, Route, Tags } from "tsoa";
import { PatientService } from "../services/PatientService";
import { PatientRepository } from "../repositories/PatientRepository";
import { AppDataSource } from "../database/data-source";
import { UserRepository } from "../repositories/UserRepository";
import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { GetPatientResponse } from "../models/patient/dtos/GetPatientResponse";
import { PatientRequest } from "../models/patient/dtos/PatientRequest";
import { CreateResponse } from "../models/shared/CreateResponse";

const patientRepository = new PatientRepository(AppDataSource);
const careProfessionalRepository = new CareProfessionalRepository(
  AppDataSource
);
const userRepository = new UserRepository(AppDataSource);
const patientService = new PatientService(
  patientRepository,
  careProfessionalRepository,
  userRepository
);

@Route("patients")
@Tags("Patients")
export class PatientController extends Controller {
  /**
   * @summary Busca a lista de todos os pacientes da base
   * @returns Lista de todos os pacientes e seus dados
   */
  @Get("/")
  public async getAllPatients(): Promise<GetPatientResponse[]> {
    return await patientService.getAllPatients();
  }
  /**
   * @summary Busca um paciente específico pelo seu ID
   * @returns Retorna os dados do paciente consultado
   */
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
    return patient;
  }
  /**
   * @summary Busca um paciente específico pelo ID do usuário associado
   * @returns Retorna os dados do paciente consultado
   */
  @Get("/user/{idUser}")
  public async getPatientByUserId(@Path() idUser: number): Promise<GetPatientResponse> {
    if (isNaN(idUser)) {
      this.setStatus(400);
      throw new Error(`Invalid user id: ${idUser}`);
    }
    const patient = await patientService.getPatientByUserId(idUser);
    if (!patient) {
      this.setStatus(404);
      throw new Error("Patient not found");
    }
    return patient;
  }
  /**
   * @summary Cria um novo cadastro de paciente na base
   * @returns Retorna o ID do cadastro criado
   */
  @Post("/")
  public async createPatient(
    @Body() patientData: PatientRequest
  ): Promise<CreateResponse> {
    const patient = await patientService.createPatient(patientData);
    if (!patient) throw new Error("Unable to create patient.");

    this.setStatus(201);
    return { id: patient.idPatient };
  }
  /**
   * @summary Atualiza o cadastro de paciente na base
   */
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
  /**
   * @summary Remove o resgistro de um paciente da base
   */
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
