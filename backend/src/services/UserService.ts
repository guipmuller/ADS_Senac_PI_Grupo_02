import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/entities/User";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  getAllUsers() {
    return this.userRepository.findAll();
  }

  getUserById(id: number) {
    return this.userRepository.findById(id);
  }

  createUser(userData: Partial<User>) {
    return this.userRepository.create(userData);
  }

  updateUser(id: number, userData: Partial<User>) {
    return this.userRepository.update(id, userData);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}