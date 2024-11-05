const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Patient = require("./patient");
const CareProfessional = require("./careProfessional");

const Appointment = sequelize.define(
  "Appointment",
  {
    idAppointment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idPatient: {
      type: DataTypes.INTEGER,
      references: {
        model: Patient,
        key: "idPatient",
      },
    },
    idCareProfessional: {
      type: DataTypes.INTEGER,
      references: {
        model: CareProfessional,
        key: "idCareProfessional",
      },
    },
  },
  {
    tableName: "Appointments",
    schema: "public",
  }
);

module.exports = Appointment;
