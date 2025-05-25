import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/user/entities/User";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  getAllUsers() {
    return this.userRepository.findAll();
  }

  getUserById(id: number) {
    return this.userRepository.findById(id);
  }

  getByFirebaseUid(uid: string) {
    return this.userRepository.findByFirebaseUid(uid);
  }

  async createUser(firebaseUid: string, userData: Partial<User>) {
    const existingUser = await this.userRepository.findByFirebaseUid(firebaseUid);
    if (existingUser) throw new Error("User already registered.");

    const userToCreate = {
      ...userData,
      firebaseUid
    };
    return this.userRepository.create(userToCreate);
  }

  updateUser(id: number, userData: Partial<User>) {
    return this.userRepository.update(id, userData);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}