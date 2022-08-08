const Card = require('../models/card')

exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then(cards => res.send({data: cards}))
    console.log('Запрос на карточки')
}

exports.createCard = (req, res) => {
  console.log('Создание карточки')
  const { name, link } = req.body;
  console.log(name, link)
  if (name && link) {
    Card.create({ name, link, owner: req.user._id })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
  } else {
    res.status(400).send({message: "Переданы некорректные данные"})
  }
};

exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cadrId)
      .orFail(() => {res.status(404).send({message: 'Карточка не найдена'})})
      .then(user => res.send({ data: user }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
  console.log('Удаление карточки')
};

exports.likeCard = (req, res) => {
   Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
      .then(user => res.send({ data: user }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }))
};

exports.deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
      .then(user => res.send({ data: user }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }))
}