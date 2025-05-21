import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Delete,
  Route,
  Tags,
  SuccessResponse,
  Security,
  Request
} from "tsoa";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { AppDataSource } from "../database/data-source";
import { UserRequest } from "../models/dtos/UserRequest";
import { GetUserResponse } from "../models/dtos/GetUserResponse";
import { CreateResponse } from "../models/dtos/CreateResponse";
import { Request as ExRequest } from "express";

const userRepository = new UserRepository(AppDataSource);
const userService = new UserService(userRepository);

function toGetUserResponse(user: any): GetUserResponse {
  return {
    id: user.idUser,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    cpf: user.cpf,
    urlImage: user.urlImage ?? null,
    isPatient: user.isPatient,
  };
}
@Route("users")
@Tags("Users")
export class UserController extends Controller {
  @Get("/")
  public async getAllUsers(): Promise<GetUserResponse[]> {
    const users = await userService.getAllUsers();
    return users.map(toGetUserResponse);
  }
  @Get("/{id}")
  public async getUserById(@Path() id: number): Promise<GetUserResponse> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid user id: ${id}`);
    }
    const user = await userService.getUserById(id);
    if (!user) {
      this.setStatus(404);
      throw new Error("User not found n database.");
    }
    return toGetUserResponse(user);
  }
  /* @Get("/firebaseUid/{uid}")
  @Security("firebase")
  public async getUserByFirebaseUid(@Request() req: ExRequest): Promise<GetUserResponse> {
    const firebaseUid = req.user?.uid;

    if (!firebaseUid) {
    this.setStatus(401);
    throw new Error("Invalid or missing Firebase UID.");
  }
    
    const user = await userService.getByFirebaseUid(firebaseUid);
    if (!user) {
      this.setStatus(404);
      throw new Error("User not found in database.");
    }
    return toGetUserResponse(user);
  } */
  @SuccessResponse("201", "Created")
  @Post("/")
  public async createUser(
    @Body() userData: UserRequest
  ): Promise<CreateResponse> {
    const user = await userService.createUser(userData);
    this.setStatus(201);
    return { id: user.idUser };
  }
  @Put("/{id}")
  public async updateUser(
    @Path() id: number,
    @Body() userData: UserRequest
  ): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid user id: ${id}`);
    }
    const updated = await userService.updateUser(id, userData);
    if (!updated) {
      this.setStatus(404);
      throw new Error(`There is no user associated with id ${id}.`);
    }
    this.setStatus(204);
  }
  @Delete("/{id}")
  public async deleteUser(@Path() id: number): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid user id: ${id}`);
    }

    const result = await userService.deleteUser(id);
    if (!result.affected) {
      this.setStatus(404);
      throw new Error("User not found");
    }
    this.setStatus(204);
  }
}
