import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { AppDataSource } from "../database/data-source";

const userRepository = new UserRepository(AppDataSource);
const userService = new UserService(userRepository);

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    if (user) res.json(user);
    else res.status(404).send("User not found");
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user.idUser);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await userService.updateUser(Number(req.params.id), req.body);
    if (updatedUser) res.json(updatedUser);
    else res.status(404).send("User not found");
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.deleteUser(Number(req.params.id));
    if (result.affected) res.status(204).send();
    else res.status(404).send("User not found");
  } catch (err) {
    next(err);
  }
};