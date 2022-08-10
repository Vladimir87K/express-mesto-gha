// const users = require("./../users.json");
const User = require('../models/user');
const {
  checkErrorValidation, checkErrorId, checkErrorDefault, checkErrorIncorrectDate,
} = require('../errors/errors');

exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => checkErrorDefault(err, res));
};

exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => checkErrorId(err, res));
};

exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  if (name && about && avatar) {
    User.create({ name, about, avatar })
      .then((user) => res.send({ data: user }))
      .catch((err) => checkErrorValidation(err, res));
  } else {
    checkErrorIncorrectDate(res);
  }
};

exports.updateProfil = (req, res) => {
  const { name, about } = req.body;
  if (name && about) {
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => res.send({ data: user }))
      .catch((err) => checkErrorValidation(err, res));
  } else {
    checkErrorIncorrectDate(res);
  }
};

exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  if (avatar) {
    User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .then((user) => res.send({ data: user }))
      .catch((err) => checkErrorDefault(err, res));
  } else {
    checkErrorIncorrectDate(res);
  }
};
