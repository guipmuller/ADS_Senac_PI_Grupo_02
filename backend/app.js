require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const syncDatabase = require("./syncDatabase");
// const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

const indexRouter = require("./routes/index");
const usersRoutes = require("./routes/usersRoutes");
const careProfessionalsRoutes = require("./routes/careProfessionalsRoutes");
const patientsRoutes = require("./routes/patientsRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");

const app = express();

// Configuração Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HomeCare API",
      version: "1.0.0",
      description: "[Swagger UI](http://localhost:3000/swagger/)",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

// Middleware para servir a documentação Swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

syncDatabase();

console.log("Carregando rotas...");

app.use("/", indexRouter);
console.log("/ rota carregada");

app.use("/api/users", usersRoutes);
console.log("/api/users rota carregada");

app.use("/api/careProfessionals", careProfessionalsRoutes);
console.log("/api/careProfessionals rota carregada");

app.use("/api/patients", patientsRoutes);
console.log("/api/patients rota carregada");

app.use("/api/appointments", appointmentsRoutes);
console.log("/api/appointments rota carregada");

app.use(function (req, res, next) {
  console.log("404 - Rota não encontrada");
  next(createError(404));
});

app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
