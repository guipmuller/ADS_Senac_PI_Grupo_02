import {
  Controller,
  Get,
  Route,
  Post,
  Body,
  Put,
  Delete,
  Path,
  Tags,
} from "tsoa";
import { AppDataSource } from "../database/data-source";
import { GetReviewResponse } from "../models/dtos/GetReviewResponse";
import { ReviewRepository } from "../repositories/ReviewRepository";
import { ReviewService } from "../services/ReviewService";
import { ReviewRequest } from "../models/dtos/ReviewRequest";
import { CreateResponse } from "../models/dtos/CreateResponse";

const reviewRepository = new ReviewRepository(AppDataSource);
const reviewService = new ReviewService(reviewRepository);

function toGetReviewResponse(review: any): GetReviewResponse {
  return {
    id: review.idReview,
    rating: review.rating,
    comment: review.comment,
    idCareProfessional: review.idCareProfessional,
    idPatient: review.idPatient,
  };
}
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  @Get("/")
  public async getAll(): Promise<GetReviewResponse[]> {
    const reviews = await reviewService.getAll();
    return reviews.map(toGetReviewResponse);
  }
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
  @Post("/")
  public async create(@Body() data: ReviewRequest): Promise<CreateResponse> {
    const newReview = await reviewService.create(data);
    this.setStatus(201);
    return { id: newReview.idReview };
  }
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
