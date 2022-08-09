// const users = require("./../users.json");
const User = require('../models/user');

function checkErrorValidation(err, res) {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: `Произошла ошибка: ${err}` });
  } else {
    res.status(500).send({ message: `Произошла ошибка: ${err}` });
  }
}

exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Переданы некорректные данные: ${err}` });
      } else {
        res.status(500).send({ message: `Произошла ошибка: ${err}` });
      }
      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  if (name && about && avatar) {
    User.create({ name, about, avatar })
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        checkErrorValidation(err, res);
      });
  } else {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  }
};

exports.updateProfil = (req, res) => {
  const { name, about } = req.body;
  if (name && about) {
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        checkErrorValidation(err, res);
      });
  } else {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  }
};

exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  if (avatar) {
    User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .then((user) => res.send({ data: user }))
      .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
  } else {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  }
};
