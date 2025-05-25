import { Body, Controller, Get, Path, Post, Put, Delete, Route, Tags, SuccessResponse, Security, Request } from "tsoa";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { AppDataSource } from "../database/data-source";
import { UserRequest } from "../models/user/dtos/UserRequest";
import { GetUserResponse } from "../models/user/dtos/GetUserResponse";
import { Request as ExRequest } from "express";
import { CreateResponse } from "../models/shared/CreateResponse";

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
  /**
   * @summary Retorna todos os usuários cadastrados
   * @returns Lista de usuários e seus dados
   */
  @Get("/")
  public async getAllUsers(): Promise<GetUserResponse[]> {
    const users = await userService.getAllUsers();
    return users.map(toGetUserResponse);
  }
  /**
   * @summary Busca um usuário pelo seu ID
   * @returns Dados do usuário
   */
  @Get("/{id}")
  public async getUserById(@Path() id: number): Promise<GetUserResponse> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid user id: ${id}`);
    }
    const user = await userService.getUserById(id);
    if (!user) {
      this.setStatus(404);
      throw new Error("User not found in database.");
    }
    return toGetUserResponse(user);
  }
  /**
   * @summary Busca um usuário pelo firebase UID dele
   * @returns Dados do usuário
   */
  @Security("firebase")
  @Get("/firebase")
  public async getUserByFirebaseUid(
    @Request() req: ExRequest
  ): Promise<GetUserResponse> {
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
  }
  /**
   * @summary Cria um novo usuário
   * @returns Usuário criado com sucesso
   */
  @SuccessResponse("201", "Created")
  @Security("firebase")
  @Post("/")
  public async createUser(
    @Request() req: ExRequest,
    @Body() userData: UserRequest
  ): Promise<CreateResponse> {
    const firebaseUid = req.user?.uid;
    if (!firebaseUid) {
      this.setStatus(401);
      throw new Error("Invalid or missing Firebase UID.");
    }
    const user = await userService.createUser(firebaseUid, userData);
    this.setStatus(201);
    return { id: user.idUser };
  }
  /**
   * @summary Altera os dados de um usuário
   * @returns Usuário alterado com sucesso
   */
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
  /**
   * @summary Remove o registro de um usuário da base
   * @returns Usuário removido com sucesso
   */
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
