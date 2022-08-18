const Card = require('../models/card');
const { cardValidation } = require('../validation/validation');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

exports.createCard = (req, res, next) => {
  const { error } = cardValidation(req.body);
  if (error) {
    throw new BadRequestError('Введены некорректные данные');
  }
  const { name, link } = req.body;
  console.log('Создание карточки');
  Card.create({ name, link, owner: req.user._id })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cadrId)
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .then((card) => {
      if (card.owner !== req.user._id) {
        throw new ForbiddenError('Нет прав на удаление карточки');
      }
      return card.remove();
    })
    .then(() => res.status(200).send({ message: `Вы удалили карточку: ${req.params.cadrId}` }))
    .catch(next);
};

exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Такой карточки не найдено'); })
    .then((user) => res.syatus(200).send({ data: user }))
    .catch(next);
};

exports.deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Такой карточки не найдено'); })
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};
