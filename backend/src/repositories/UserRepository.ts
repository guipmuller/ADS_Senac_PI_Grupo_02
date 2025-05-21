import { DataSource, Repository } from "typeorm";
import { User } from "../models/entities/User";

export class UserRepository {
  private repo: Repository<User>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(User);
  }

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOneBy({ idUser: id });
  }
/* 
  findByFirebaseUid(uid: string) {
    return this.repo.findOneBy({firebaseUid: uid});
  }
 */
  create(userData: Partial<User>) {
    const user = this.repo.create(userData);
    return this.repo.save(user);
  }

  async update(id: number, userData: Partial<User>) {
    await this.repo.update(id, userData);
    return this.findById(id);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}