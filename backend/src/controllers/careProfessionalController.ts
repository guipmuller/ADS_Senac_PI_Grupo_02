import { Request, Response, NextFunction } from "express";
import { CareProfessionalService } from "../services/CareProfessionalService";
import { CareProfessionalRepository } from "../repositories/CareProfessionalRepository";
import { AppDataSource } from "../database/data-source";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";

const careProfessionalRepository = new CareProfessionalRepository(AppDataSource);
const careProfessionalService = new CareProfessionalService(careProfessionalRepository);
const userRepository = new UserRepository(AppDataSource);
const userService = new UserService(userRepository);

export const getAllCareProfessionals = async (req: Request, res : Response, next: NextFunction) : Promise<void> => {
  try {
    const careProfessionals = await careProfessionalService.getAllCareProfessionals();
    res.json(careProfessionals);
  } catch (err) {
    next(err);
  }
};

export const getCareProfessionalById = async (req: Request, res : Response, next: NextFunction) : Promise<void> => {
  try {
    const careProfessional = await careProfessionalService.getCareProfessionalById(Number(req.params.id));
    if (careProfessional) {
      res.json(careProfessional);
    } else {
      res.status(404).send("CareProfessional not found");
    }
  } catch (err) {
    next(err);
  }
};

export const createCareProfessional = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const { idUser, ...careProfessionalData } = req.body;
    const userExists = await userService.getUserById(idUser);
    if (!userExists) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const careProfessional = await careProfessionalService.createCareProfessionals({ idUser, ...careProfessionalData });
    res.status(201).json({ id: careProfessional.idCareProfessional });
    return;
  } catch (err) {
    console.error("Erro ao criar CareProfessional:", err);
    next(err);
  }
};

export const updateCareProfessional = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const updatedCareProfessional = await careProfessionalService.updateCareProfessionals(Number(req.params.id), req.body);
    if (updatedCareProfessional) {
      const updateCareProfessional = await careProfessionalService.getCareProfessionalById(Number(req.params.id));
      res.status(200).json(updateCareProfessional);
      return;
    } else {
      res.status(404).send("CareProfessional not found");
      return;
    }
  } catch (err) {
    next(err);
  }
};

export const deleteCareProfessional = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const deleted = await careProfessionalService.deleteCareProfessionals(Number(req.params.id));
    if (deleted) { 
      res.status(204).send();
      return;
    }
    else {
      res.status(404).send("CareProfessional not found");
      return;
    }
  } catch (err) {
    next(err);
  }
};
