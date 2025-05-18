import {
  Controller,
  Route,
  Tags,
  Get,
  Post,
  Put,
  Delete,
  Path,
  Body,
  SuccessResponse,
  Response as TsoaResponse,
} from "tsoa";

import { AddressService } from "../services/AddressService";
import { AddressRepository } from "../repositories/AddressRepository";
import { AppDataSource } from "../database/data-source";
import { AddressRequest } from "../models/dtos/AddressRequest";
import { CreateResponse } from "../models/dtos/CreateResponse";
import { GetAddressResponse } from "../models/dtos/GetAddressResponse";

const addressRepository = new AddressRepository(AppDataSource);
const addressService = new AddressService(addressRepository);

function toGeResponse(entity: any): GetAddressResponse {
  return {
    id: entity.idAddress,
    street: entity.street,
    number: entity.number,
    neighborhood: entity.neighborhood,
    city: entity.city,
    state: entity.state,
    postalCode: entity.postalCode,
    country: entity.country,
  };
}
@Route("addresses")
@Tags("Addresses")
export class AddressController extends Controller {
  @Get("/")
  public async getAllAddresses(): Promise<GetAddressResponse[]> {
    const addresses = await addressService.getAll();
    return addresses.map(toGeResponse);
  }
  @Get("/{id}")
  @TsoaResponse<null>(404, "Address not found")
  public async getAddressById(@Path() id: number): Promise<GetAddressResponse> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid address id: ${id}`);
    }
    const address = await addressService.getById(id);
    if (!address) {
      this.setStatus(404);
      throw new Error("Address not found");
    }

    return toGeResponse(address);
  }
  @SuccessResponse("201", "Created")
  @Post("/")
  public async createAddress(@Body() data: AddressRequest): Promise<CreateResponse> {
    const newAddress = await addressService.create(data);
    this.setStatus(201);
    return { id: newAddress.idAddress };
  }

  @Put("/{id}")
  @SuccessResponse("204", "No Content")
  @TsoaResponse<null>(404, "Address not found")
  public async updateAddress(
    @Path() id: number,
    @Body() data: AddressRequest
  ): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid address id: ${id}`);
    }
    const updated = await addressService.update(id, data);
    if (!updated) {
      this.setStatus(404);
      throw new Error(`There is no address associated with id ${id}.`);
    }
    this.setStatus(204);
  }

  @Delete("{id}")
  @SuccessResponse("204", "No Content")
  @TsoaResponse<null>(404, "Address not found")
  public async removeAddress(@Path() id: number): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid user id: ${id}`);
    }

    const deleted = await addressService.delete(id);
    if (!deleted) {
      this.setStatus(404);
      throw new Error(`There is no address associated with id ${id}.`);
    }
    this.setStatus(204);
  }
}
