import Joi from 'joi';

const userSchema = Joi.object().keys({
    firstname: Joi.string().alphanum().min(3).max(50)
    .required(),
    lastname: Joi.string().alphanum().min(3).max(50)
    .required(),
    othername: Joi.string().alphanum().min(3).max(50),
    phoneNumber: Joi.number().integer().min(12)
    .required(),
    email: Joi.string().email({ minDomainAtomas: 2 })
    .required(),
    username: Joi.string().alphanum().min(3).max(50)
    .required(),
});

const meetupSchema = Joi.object().keys({
    location: Joi.string().alphanum().min(3).max(50)
    .required(),
    images: Joi.string(),

    topic: Joi.string().alphanum().min(3).max(50)
    .required(),
    happeningOn: Joi.date()
    .required(),
    tags: Joi.string().alphanum().min(3),
});

export default {
    userSchema,
    meetupSchema
};