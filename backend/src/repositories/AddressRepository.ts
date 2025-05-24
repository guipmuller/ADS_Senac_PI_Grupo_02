import { DataSource, FindManyOptions, Repository } from "typeorm";
import { Address } from "../models/address/entities/Address";

export class AddressRepository {
  private repo: Repository<Address>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Address);
  }

  findAll(options?: FindManyOptions<Address>) {
    return this.repo.find(options);
  }

  findById(id: number) {
    return this.repo.findOneBy({ idAddress: id });
  }

  async createAndSave(addressData: Partial<Address>) {
    const address = this.repo.create(addressData);
    return this.repo.save(address);
  }

  async update(id: number, addressData: Partial<Address>): Promise<boolean> {
    const result = await this.repo.update(id, addressData);
    return result.affected !== 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
