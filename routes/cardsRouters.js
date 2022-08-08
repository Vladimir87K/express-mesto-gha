const express = require('express');
const cardsRouters = express.Router();

const { getCards, createCard, deleteCard, likeCard, deleteLikeCard } = require('./../controllers/cardsControllers')

cardsRouters.get('/cards', getCards);
cardsRouters.post('/cards', createCard);
cardsRouters.delete('/cards/:cadrId', deleteCard);
cardsRouters.put('/cards/:cardId/likes', likeCard);
cardsRouters.delete('/cards/:cardId/likes', deleteLikeCard);

module.exports = cardsRouters;
