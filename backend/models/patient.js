const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: console.log,
});

const User = require("./user");

const Patient = sequelize.define(
  "Patient",
  {
    idPatient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patientCPF: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    patientBirthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Patients",
    schema: "public",
  }
);

Patient.belongsTo(User, { foreignKey: "idUser" });

module.exports = Patient;
