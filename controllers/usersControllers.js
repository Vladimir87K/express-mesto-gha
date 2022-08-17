const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Error('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
            res.send(token);
          } else {
            throw new Error('Неправильные почта или пароль');
          }
        });
    })
    .catch(next);
};

exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

exports.updateProfil = (req, res, next) => {
  const { name, about } = req.body;
  if (!name || !about) {
    throw new Error('Данные не введены');
  } else {
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => res.send({ data: user }))
      .catch(next);
  }
};

exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) {
    throw new Error('Данные не введены');
  } else {
    User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .then((user) => res.send({ data: user }))
      .catch(next);
  }
};
