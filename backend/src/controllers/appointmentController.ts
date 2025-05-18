import {
  Controller,
  Route,
  Tags,
  Get,
  Post,
  Put,
  Delete,
  Path,
  Body,
  SuccessResponse,
  Response as TsoaResponse,
} from "tsoa";
import { AppointmentService } from "../services/AppointmentService";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AppDataSource } from "../database/data-source";
import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { CareProfessionalService } from "../services/CareProfessionalService";
import { PatientRepository } from "../repositories/PatientRepository";
import { PatientService } from "../services/PatientService";
import { AppointmentStatus } from "../models/enums/AppointmentStatus";
import { Appointment } from "../models/entities/Appointment";
import { AppointmentRequest } from "../models/dtos/AppointmentRequest";
import { GetAppointmentResponse } from "../models/dtos/GetAppointmentResponse";
import { CreateResponse } from "../models/dtos/CreateResponse";

const appointmentRepository = new AppointmentRepository(AppDataSource);
const appointmentService = new AppointmentService(appointmentRepository);
const careProfessionalRepository = new CareProfessionalRepository(
  AppDataSource
);
const careProfessionalService = new CareProfessionalService(
  careProfessionalRepository
);
const patientRepository = new PatientRepository(AppDataSource);
const patientService = new PatientService(patientRepository);

function toGetResponse(entity: any): GetAppointmentResponse {
  return {
    id: entity.idAppointment,
    scheduledAt: entity.scheduledAt,
    idAdress: entity.idAdress,
    idPatient: entity.idPatient,
    idCareProfessional: entity.idCareProfessional,
    status: entity.status,
  };
}

@Route("appointments")
@Tags("Appointments")
export class AppointmentController extends Controller {
  @Get("/")
  public async getAllAppointments(): Promise<GetAppointmentResponse[]> {
    const response = await appointmentService.getAllAppointments();
    return response.map(toGetResponse);
  }

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
  @SuccessResponse("201", "Created")
  @Post("/")
  public async createAppointment(@Body() body: any): Promise<CreateResponse> {
    const { idCareProfessional, idPatient, status } = body;

    const careProfessionalExists =
      await careProfessionalService.getCareProfessionalById(idCareProfessional);
    if (!careProfessionalExists) {
      this.setStatus(404);
      throw new Error("Care professional not found");
    }

    const patientExists = await patientService.getPatientById(idPatient);
    if (!patientExists) {
      this.setStatus(404);
      throw new Error("Patient not found");
    }

    if (!Object.values(AppointmentStatus).includes(status)) {
      this.setStatus(400);
      throw new Error("Invalid appointment status");
    }

    const appointment = await appointmentService.createAppointments(body);
    this.setStatus(201);
    return { id: appointment.idAppointment };
  }
  @SuccessResponse("204", "No Content")
  @Put("{id}")
  public async updateAppointment(
    @Path() id: number,
    @Body() body: any
  ): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid appointment id: ${id}`);
    }

    const { status } = body;

    if (status && !Object.values(AppointmentStatus).includes(status)) {
      this.setStatus(400);
      throw new Error("Invalid appointment status");
    }

    const updated = await appointmentService.updateAppointments(id, body);
    if (!updated) {
      this.setStatus(404);
      throw new Error("Appointment not found");
    }
    this.setStatus(204)
  }
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
