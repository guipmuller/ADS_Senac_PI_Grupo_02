import { ReviewRepository } from "../repositories/ReviewRepository";
import { Review } from "../models/entities/Review";

export class ReviewService {
  constructor(private repository: ReviewRepository) {}

  async getAll(): Promise<Review[]> {
      return this.repository.findAll();
    }
  
    async getById(id: number): Promise<Review | null> {
      return this.repository.findById(id);
    }
  
    async create(reviewData: Partial<Review>): Promise<Review> {
      return this.repository.createAndSave(reviewData);
    }
  
    async update(id: number, reviewData: Partial<Review>): Promise<boolean> {
      return this.repository.update(id, reviewData);
    }
  
    async delete(id: number): Promise<boolean> {
      return this.repository.delete(id);
    }
}