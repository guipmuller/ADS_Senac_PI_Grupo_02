import { Response, Request, NextFunction } from "express";
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
    idPatient: review.idPatient
  };
}

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reviews = await reviewService.getAll();
    const dtoList: GetReviewResponse[] = reviews.map(toGetReviewResponse);
    res.json(dtoList);
  } catch (err) {
    next(err);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: `Invalid review id: ${id}.` });
      return;
    }
    const review = await reviewService.getById(id);
    if (!review) {
      res.status(404).json({ message: "Review not found." });
      return;
    }

    const dto: GetReviewResponse = toGetReviewResponse(review);
    res.json(dto);
    return;
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const data: ReviewRequest = req.body;
  try {
    const newReview = await reviewService.create(data);
    const response: CreateResponse = { id: newReview.idReview };
    res.status(201).json(response);
    return;
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: `Invalid review id: ${id}.` });
      return;
    }
    const data: ReviewRequest = req.body;
    const updated = await reviewService.update(id, data);
    if (!updated) {
      res
        .status(404)
        .json({ message: `There is no review associated with id ${id}.` });
      return;
    }
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: `Invalid review id: ${id}.` });
      return;
    }
    const deleted = await reviewService.delete(id);
    if (!deleted) {
      res
        .status(404)
        .json({ message: `There is no review associated with id ${id}.` });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
