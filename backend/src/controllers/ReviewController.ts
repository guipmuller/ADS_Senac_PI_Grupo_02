import {Controller, Get, Route, Post, Body, Put, Delete, Path, Tags, Query,} from "tsoa";
import { AppDataSource } from "../database/data-source";
import { ReviewRepository } from "../repositories/ReviewRepository";
import { ReviewService } from "../services/ReviewService";
import { PatientRepository } from "../repositories/PatientRepository";
import { UserRepository } from "../repositories/UserRepository";
import { GetReviewResponse } from "../models/review/dtos/GetReviewResponse";
import { ReviewRequest } from "../models/review/dtos/ReviewRequest";
import { CreateResponse } from "../models/shared/CreateResponse";
import { DetailedReview } from "../models/review/dtos/DetailedReview";

const reviewRepository = new ReviewRepository(AppDataSource);
const patientRepository = new PatientRepository(AppDataSource);
const userRepository = new UserRepository(AppDataSource);
const reviewService = new ReviewService(
  reviewRepository,
  patientRepository,
  userRepository
);

function toGetReviewResponse(review: DetailedReview): GetReviewResponse {
  return {
    id: review.idReview,
    rating: review.rating,
    comment: review.comment!,
    idCareProfessional: review.idCareProfessional,
    patient: {
      id: review.patient.id,
      name: review.patient.name,
      urlImage: review.patient.urlImage
    }
  };
}
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  /**
   * @summary Busca a lista de as avaliações na base
   * @param idCareProfessional Filtra pelo ID do cuidador (Somente um filtro deve ser usado por consulta)
   * @param idCarePatient Filtra pelo ID do paciente
   * @returns Lista de todas as avaliações
   */
  @Get("/")
  public async getAll(
    @Query() idCareProfessional?: number,
    @Query() idPatient?: number
  ): Promise<GetReviewResponse[]> {
    if (idCareProfessional && idPatient)
      throw new Error("Only one filter should be used per consultation.");

    const reviews = await reviewService.getAll(idCareProfessional, idPatient);
    return reviews.map(toGetReviewResponse);
  }
  /**
   * @summary Busca de uma avaliação pelo seu ID
   * @returns Retorna a avaliação consultada
   */
  @Get("/{id}")
  public async getById(@Path() id: number): Promise<GetReviewResponse> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid review id: ${id}`);
    }
    const review = await reviewService.getById(id);
    if (!review) {
      this.setStatus(404);
      throw new Error("Review not found.");
    }
    return toGetReviewResponse(review);
  }
  /**
   * @summary Cria uma nova avaliação
   * @returns Retorna o ID da avaliação criada
   */
  @Post("/")
  public async create(@Body() data: ReviewRequest): Promise<CreateResponse> {
    const newReview = await reviewService.create(data);
    this.setStatus(201);
    return { id: newReview.idReview };
  }
  /**
   * @summary Atualiza uma avaliação
   */
  @Put("/{id}")
  public async update(
    @Path() id: number,
    @Body() data: ReviewRequest
  ): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid review id: ${id}`);
    }

    const updated = await reviewService.update(id, data);
    if (!updated) {
      this.setStatus(404);
      throw new Error(`There is no review associated with id ${id}.`);
    }
    this.setStatus(204);
  }
  /**
   * @summary Deleta a avaliação
   */
  @Delete("/{id}")
  public async remove(@Path() id: number): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid review id: ${id}`);
    }

    const deleted = await reviewService.delete(id);
    if (!deleted) {
      this.setStatus(404);
      throw new Error(`There is no review associated with id ${id}.`);
    }
    this.setStatus(204);
  }
}
