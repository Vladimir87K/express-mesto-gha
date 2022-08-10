const Card = require('../models/card');
const { checkErrorValidation, checkErrorId } = require('../errors/errors');

exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }));
};

exports.createCard = (req, res) => {
  const { name, link } = req.body;
  if (name && link) {
    Card.create({ name, link, owner: req.user._id })
      .then((user) => res.send({ data: user }))
      .catch((err) => checkErrorValidation(err, res));
  } else {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  }
};

exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cadrId)
    .orFail(() => { res.status(404).send({ message: 'Карточка не найдена' }); })
    .then((user) => res.send({ data: user }))
    .catch((err) => checkErrorId(err, res));
};

exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => { res.status(404).send({ message: 'Карточка не найдена' }); })
    .then((user) => res.send({ data: user }))
    .catch((err) => checkErrorId(err, res));
};

exports.deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => { res.status(404).send({ message: 'Карточка не найдена' }); })
    .then((user) => res.send({ data: user }))
    .catch((err) => checkErrorId(err, res));
};
