import { DataSource, FindManyOptions, Repository } from "typeorm";
import { Review } from "../models/entities/Review";

export class ReviewRepository {
  private repo: Repository<Review>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Review);
  }

  findAll(options?: FindManyOptions<Review>) {
      return this.repo.find(options);
    }
  
    findById(id: number) {
      return this.repo.findOneBy({ idReview: id });
    }
  
    async createAndSave(reviewData: Partial<Review>) {
      const review = this.repo.create(reviewData);
      return this.repo.save(review);
    }
  
    async update(id: number, reviewData: Partial<Review>): Promise<boolean> {
      const result = await this.repo.update(id, reviewData);
      return result.affected !== 0;
    }
  
    async delete(id: number): Promise<boolean> {
      const result = await this.repo.delete(id);
      return result.affected !== 0;
    }
}