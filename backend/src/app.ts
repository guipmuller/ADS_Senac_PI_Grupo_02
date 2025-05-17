import 'dotenv/config';

import swaggerJsdoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import createError from "http-errors";
import express, { Request, Response, json, NextFunction, urlencoded } from "express";
import { dirname, join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index";
import usersRoutes from "./routes/userRoutes";
import careProfessionalsRoutes from "./routes/careProfessionalsRoutes";
import patientsRoutes from "./routes/patientsRoutes";
import appointmentsRoutes from "./routes/appointmentsRoutes";
import addressRoutes from "./routes/addressRoutes"
import { fileURLToPath } from 'url';

const app = express();

 //Configuração Swagger
 const options = {
   definition: {
     openapi: '3.0.0',
     info: {
       title: 'HomeCare API',
       version: '1.0.0',
       description: '[Swagger UI](http://localhost:3000/swagger/)',
     },
   },
   apis: ['./src/routes/*.ts'],
 };
 const swaggerSpec = swaggerJsdoc(options);
 // Middleware para servir a documentação Swagger
 app.use('/swagger', serve, setup(swaggerSpec));

 const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("views", join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use(cors());

console.log("Carregando rotas...");

app.use("/", indexRouter);
console.log("/ rota carregada");

app.use("/api/users", usersRoutes);
console.log("/api/users rota carregada");

app.use("/api/care-professionals", careProfessionalsRoutes);
console.log("/api/care-professionals rota carregada");

app.use("/api/patients", patientsRoutes);
console.log("/api/patients rota carregada");

app.use("/api/appointments", appointmentsRoutes);
console.log("/api/appointments rota carregada");

app.use("/api/addresses", addressRoutes);
console.log("/api/addresses rota carregada");

app.use(function (req, res, next) {
  console.log("404 - Rota não encontrada");
  next(createError(404));
});

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

export default app;
