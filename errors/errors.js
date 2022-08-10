exports.checkErrorValidation = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: `Произошла ошибка: ${err}` });
  } else {
    res.status(500).send({ message: `Произошла ошибка: ${err}` });
  }
};

exports.checkErrorId = (err, res) => {
  if (err.name === 'CastError') {
    res.status(400).send({ message: `Использовано некорректное _id: ${err}` });
  } else {
    res.status(500).send({ message: `Произошла ошибка: ${err}` });
  }
};
