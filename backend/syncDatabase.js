const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./database");

const queryInterface = sequelize.getQueryInterface();

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Conexão estabelecida com sucesso.");

    await queryInterface.createTable("Users", {
      idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    console.log("Tabela Users criada com sucesso.");

    await queryInterface.createTable("Patients", {
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
      idUser: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "idUser",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    console.log("Tabela Patients criada com sucesso.");

    await queryInterface.createTable("CareProfessionals", {
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
      idUser: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "idUser",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    console.log("Tabela CareProfessionals criada com sucesso.");

    await queryInterface.createTable("Appointments", {
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
          model: "Patients",
          key: "idPatient",
        },
      },
      idCareProfessional: {
        type: DataTypes.INTEGER,
        references: {
          model: "CareProfessionals",
          key: "idCareProfessional",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    console.log("Tabela Appointments criada com sucesso.");
  } catch (error) {
    console.error("Erro ao sincronizar banco de dados ", error);
  }
}

module.exports = syncDatabase;
