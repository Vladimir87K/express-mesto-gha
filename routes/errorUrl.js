const express = require('express');

const errorUrl = express.Router();

errorUrl.use('/*', (req, res) => {
  res.status(404).send({ message: 'Указан некорректный Url' });
});

module.exports = errorUrl;
