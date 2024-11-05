const CareProfessional = require("../models/careProfessional");
const User = require("../models/user");

exports.getAllCareProfessionals = async (req, res, next) => {
  try {
    const careProfessionals = await CareProfessional.findAll();
    res.json(careProfessionals);
  } catch (err) {
    next(err);
  }
};

exports.getCareProfessionalById = async (req, res, next) => {
  try {
    const careProfessional = await CareProfessional.findByPk(req.params.id);
    if (careProfessional) {
      res.json(careProfessional);
    } else {
      res.status(404).send("CareProfessional not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.createCareProfessional = async (req, res, next) => {
  try {
    console.log("Dados recebidos:", req.body);
    const careProfessional = await CareProfessional.create(req.body);
    const userExists = await User.findByPk(req.body.idUser);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(201).json(careProfessional);
  } catch (err) {
    console.error("Erro ao criar CareProfessional:", err);
    next(err);
  }
};

exports.updateCareProfessional = async (req, res, next) => {
  try {
    const [updated] = await CareProfessional.update(req.body, {
      where: { idCareProfessional: req.params.id },
    });
    if (updated) {
      const updateCareProfessional = await CareProfessional.findByPk(
        req.params.id
      );
      res.status(200).json(updateCareProfessional);
    } else {
      res.status(404).send("CareProfessional not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteCareProfessional = async (req, res, next) => {
  try {
    const deleted = await CareProfessional.destroy({
      where: { idCareProfessional: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send("CareProfessional not found");
    }
  } catch (err) {
    next(err);
  }
};
