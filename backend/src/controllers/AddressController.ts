import { Response, Request, NextFunction } from "express";
import { AddressRepository } from "../repositories/AddressRepository";
import { AppDataSource } from "../database/data-source";
import { AddressService } from "../services/AddressService";
import { AddressRequest } from "../models/dtos/AddressRequest";
import { CreateAddressResponse } from "../models/dtos/CreateAddressResponse";
import { GetAddressResponse } from "../models/dtos/GetAddressResponse";

const addressRepository = new AddressRepository(AppDataSource);
const addressService = new AddressService(addressRepository);

function toGetAddressResponse(address: any): GetAddressResponse {
  return {
    id: address.id,
    street: address.street,
    number: address.number,
    neighborhood: address.neighborhood,
    city: address.city,
    state: address.state,
    postalCode: address.postalCode,
    country: address.country,
  };
}

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const addresses = await addressService.getAll();
    const dtoList: GetAddressResponse[] = addresses.map(toGetAddressResponse);
    res.json(dtoList);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid address id." });
      return;
    }
    const address = await addressService.getById(id);
    if (!address) {
      res.status(404).json({ message: "Address not found." });
      return;
    }
    const dto: GetAddressResponse = toGetAddressResponse(address);
    res.json(dto);
    return;
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const data: AddressRequest = req.body;

  try {
    const newAddress = await addressService.create(data);
    const response: CreateAddressResponse = { idAddress: newAddress.idAddress };
    res.status(201).json(response);
    return;
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid address id." });
      return;
    }
    const data: AddressRequest = req.body;
    const updated = await addressService.update(id, data);
    if (!updated) {
      res.status(404).json({ message: `There is no address associated with id ${id}.` });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid address id." });
      return;
    }
    const deleted = await addressService.delete(id);
    if (!deleted) {
      res.status(404).json({ message: `There is no address associated with id ${id}.` });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};