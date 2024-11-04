const User = require("../models/user");

exports.getAllUsers = async (req, res, next) => {
  try {
    console.log("Chamando findAll no modelo User");
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { idUser: req.params.id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.destroy({
      where: { idUser: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    next(err);
  }
};
