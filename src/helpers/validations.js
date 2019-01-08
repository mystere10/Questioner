import Joi from 'joi';

const userSchema = Joi.object().keys({
    firstname: Joi.string().alphanum().min(3).max(50)
    .required(),
    lastname: Joi.string().alphanum().min(3).max(50)
    .required(),
    othername: Joi.string().alphanum().min(3).max(50)
    .required(),
    phoneNumber: Joi.number().integer().min(10)
    .required(),
    email: Joi.string().email({ minDomainAtomas: 2 })
    .required(),
    username: Joi.string().alphanum().min(3).max(50)
    .required(),
    isAdmin: Joi.string()
    .required(),
});

export default {
    userSchema
};