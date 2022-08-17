const Card = require('../models/card');

exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  if (!name || !link) {
    throw new Error('Данные не введены');
  } else {
    Card.create({ name, link, owner: req.user._id })
      .then((user) => res.send({ data: user }))
      .catch(next);
  }
};

exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cadrId)
    .then((card) => {
      if (!card) {
        throw new Error('Карточка не найдена');
      } else if (card.owner !== req.user._id) {
        throw new Error('Нет прав на удаление карточки');
      }
      return card.remove();
    })
    .then(() => res.status(200).send({ message: `You deleted the card ${req.params.cadrId}` }))
    .catch(next);
};

exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => { throw new Error('NotFound'); })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

exports.deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => { throw new Error('NotFound'); })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
