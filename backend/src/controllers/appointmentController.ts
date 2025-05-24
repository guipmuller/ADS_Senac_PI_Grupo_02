import { Controller, Route, Tags, Get, Post, Put, Delete, Path, Body, SuccessResponse, Response as TsoaResponse, Query } from "tsoa";
import { AppointmentService } from "../services/AppointmentService";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AppDataSource } from "../database/data-source";
import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { PatientRepository } from "../repositories/PatientRepository";
import { AddressRepository } from "../repositories/AddressRepository";
import { GetAppointmentResponse } from "../models/appointment/dtos/GetAppointmentResponse";
import { PostAppointmentRequest } from "../models/appointment/dtos/PostAppointmentRequest";
import { CreateResponse } from "../models/shared/CreateResponse";
import { PutAppointmentRequest } from "../models/appointment/dtos/PutAppointmentRequest";


const appointmentRepository = new AppointmentRepository(AppDataSource);
const addressRepository = new AddressRepository(AppDataSource);

const patientRepository = new PatientRepository(AppDataSource);
const careProfessionalRepository = new CareProfessionalRepository(
  AppDataSource
);

const appointmentService = new AppointmentService(
  appointmentRepository,
  addressRepository,
  patientRepository,
  careProfessionalRepository
);

function toGetResponse(entity: any): GetAppointmentResponse {
  return {
    id: entity.idAppointment,
    scheduledAt: entity.scheduledAt,
    idAddress: entity.idAddress,
    idPatient: entity.idPatient,
    idCareProfessional: entity.idCareProfessional,
    status: entity.status,
  };
}

@Route("appointments")
@Tags("Appointments")
export class AppointmentController extends Controller {
  /**
   * @summary Busca por todos os agendamentos da base
   * @returns Lista de todos os agendamentos
   */
  @Get("/")
  public async getAllAppointments(
    @Query() idCareProfessional?: number,
    @Query() idPatient?: number
  ): Promise<GetAppointmentResponse[]> {
    if (idCareProfessional && idPatient)
      throw new Error("Only one filter should be used per consultation.");
    
    const response = await appointmentService.getAllAppointments(
      idCareProfessional,
      idPatient
    );
    return response.map(toGetResponse);
  }
  /**
   * @summary Busca por um agendamento pelo seu ID
   * @returns Exibe os dados do agendamento
   */
  @Get("/{id}")
  @TsoaResponse<null>(404, "Appointment not found")
  public async getAppointmentById(
    @Path() id: number
  ): Promise<GetAppointmentResponse> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid appointment id: ${id}`);
    }
    const appointment = await appointmentService.getAppointmentById(id);
    if (!appointment) {
      this.setStatus(404);
      throw new Error("Appointment not found");
    }
    return toGetResponse(appointment);
  }
  /**
   * @summary Cria um novo agendamento
   * @returns Retorna o ID do agendamento criado
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  public async createAppointment(
    @Body() body: PostAppointmentRequest
  ): Promise<CreateResponse> {
    const appointment = await appointmentService.createAppointments(body);
    this.setStatus(201);
    return { id: appointment.idAppointment };
  }
  /**
   * @summary Atualiza um agendamento pelo ID
   */
  @SuccessResponse("204", "No Content")
  @Put("{id}")
  public async updateAppointment(
    @Path() id: number,
    @Body() body: PutAppointmentRequest
  ): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid appointment id: ${id}`);
    }

    const updated = await appointmentService.updateAppointments(id, body);
    if (!updated) {
      this.setStatus(404);
      throw new Error("Appointment not found");
    }
    this.setStatus(204);
  }
  /**
   * @summary Remove um agendamento da base
   */
  @SuccessResponse("204", "No Content")
  @Delete("{id}")
  public async deleteAppointment(@Path() id: number): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid user id: ${id}`);
    }

    const deleted = await appointmentService.deleteAppointments(id);
    if (!deleted) {
      this.setStatus(404);
      throw new Error("Appointment not found");
    }
    this.setStatus(204);
  }
}
