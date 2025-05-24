import { ReviewRepository } from "../repositories/ReviewRepository";
import { PatientRepository } from "../repositories/PatientRepository";
import { UserRepository } from "../repositories/UserRepository";
import { Review } from "../models/review/entities/Review";
import { DetailedReview } from "../models/review/dtos/DetailedReview";
import { NotFoundError } from "../errors/NotFoundError";

export class ReviewService {
  constructor(
    private repository: ReviewRepository,
    private patientRepository: PatientRepository,
    private userRepository: UserRepository
  ) {}

  async getAll(
    idCareProfessional: number | undefined,
    idPatient: number | undefined
  ): Promise<DetailedReview[]> {
    const where: any = {};
    if (idCareProfessional) where.idCareProfessional = idCareProfessional;
    if (idPatient) where.idPatient = idPatient;

    const reviews = await this.repository.findAll({ where });

    const detailedReviews = await Promise.all(
      reviews.map(async (review) => {
        try {
          const patient = await this.patientRepository.findById(
            review.idPatient
          );
          if (!patient) throw new Error("Patient not found");

          const user = await this.userRepository.findById(patient.idUser);
          if (!user) throw new Error("User not found");

          return {
            ...review,
            patient: {
              id: patient.idPatient,
              name: user.name,
              urlImage: user.urlImage,
            },
          } as DetailedReview
        } catch (e) {
          console.error("Error processing review:", e);
          return null;
        }
      })
    );

    return detailedReviews.filter((r): r is DetailedReview => r !== null);
  }

  async getById(id: number): Promise<DetailedReview | null> {
    const review = await this.repository.findById(id);
    if (!review) throw new NotFoundError("Review not found");

    const patient = await this.patientRepository.findById(review.idPatient);
    if (!patient) throw new NotFoundError("Patient not found");
    
    const user = await this.userRepository.findById(patient.idUser);
    if (!user) throw new NotFoundError("User not found");

    return {
      ...review,
      patient: {
        id: patient.idPatient,
        name: user.name,
        urlImage: user.urlImage,
      },
    } as DetailedReview;
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
