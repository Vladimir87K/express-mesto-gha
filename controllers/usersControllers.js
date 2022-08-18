const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  userValidation, userUpdateValidation, userUpdateAvatarValidation, validationId,
} = require('../validation/validation');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(next);
};

exports.getUserById = (req, res, next) => {
  const { error } = validationId({ id: req.params.userId });
  if (error) {
    throw new BadRequestError('Использован некорректный Id');
  }
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Использованный Id не найден');
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};

exports.login = (req, res, next) => {
  const { error } = userValidation(req.body);
  if (error) {
    throw new BadRequestError('Введены некорректные данные');
  }
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
            res.status(200).send({ token });
          } else {
            throw new BadRequestError('Неправильные почта или пароль');
          }
        });
    })
    .catch(next);
};

exports.createUser = (req, res, next) => {
  const { error } = userValidation(req.body);
  if (error) {
    throw new BadRequestError('Введены некорректные данные');
  }
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch(next);
};

exports.updateProfil = (req, res, next) => {
  const { error } = userUpdateValidation(req.body);
  if (error) {
    throw new BadRequestError('Введены некорректные данные');
  }
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

exports.updateAvatar = (req, res, next) => {
  const { error } = userUpdateAvatarValidation(req.body);
  if (error) {
    throw new BadRequestError('Введены некорректные данные');
  }
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};
