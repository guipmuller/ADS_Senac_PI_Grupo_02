const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: console.log,
});

const User = require("./user");

const CareProfessional = sequelize.define(
  "CareProfessional",
  {
    idCareProfessional: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    professionalRegistryCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    professionalBiography: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "CareProfessionals",
    schema: "public",
  }
);

CareProfessional.belongsTo(User, { foreignKey: "idUser" });

module.exports = CareProfessional;
