const { Joi } = require('celebrate');

const redex = /https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i;

exports.userValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(redex),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).unknown(true);
  return schema.validate(data);
};

exports.cardValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required().pattern(redex),
  }).unknown(true);
  return schema.validate(data);
};

exports.userUpdateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }).unknown(true);
  return schema.validate(data);
};

exports.userUpdateAvatarValidation = (data) => {
  const schema = Joi.object({
    avatar: Joi.string().pattern(redex),
  }).unknown(true);
  return schema.validate(data);
};

exports.validationId = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  }).unknown(true);
  return schema.validate(data);
};
