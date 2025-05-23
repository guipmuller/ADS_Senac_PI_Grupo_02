import { AddressRepository } from "../repositories/AddressRepository";
import { Address } from "../models/entities/Address";

export class AddressService {
  constructor(private repository: AddressRepository) {}

  async getAll(): Promise<Address[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<Address | null> {
    return this.repository.findById(id);
  }

  async create(addressData: Partial<Address>): Promise<Address> {
    return this.repository.createAndSave(addressData);
  }

  async update(id: number, addressData: Partial<Address>): Promise<boolean> {
    return this.repository.update(id, addressData);
  }

  async delete(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}