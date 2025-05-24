import { DataSource, FindManyOptions, Repository } from "typeorm";
import { Appointment } from "../models/appointment/entities/Appointment";

export class AppointmentRepository {
  private repo: Repository<Appointment>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Appointment);
  }

  findAll(options?: FindManyOptions<Appointment>) {
    return this.repo.find(options);
  }

  findById(id: number) {
    return this.repo.findOneBy({ idAppointment: id });
  }

  createAndSave(appointmentData: Partial<Appointment>) {
    const appointment = this.repo.create(appointmentData);
    return this.repo.save(appointment);
  }

  async update(id: number, appointmentData: Partial<Appointment>) {
    const result = await this.repo.update(id, appointmentData);
    if (result.affected === 0) return null;
    return this.findById(id);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
