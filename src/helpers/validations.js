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
  password: Joi.string().alphanum().min(3).max(50)
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
<<<<<<< HEAD
  tags: Joi.array().items(Joi.string().min(3)),
});

const questionSchema = Joi.object().keys({
  createdBy: Joi.string().min(36).max(36)
=======
  tags: Joi.string().alphanum().min(3),
});

const questionSchema = Joi.object().keys({
  createdBy: Joi.number().integer()
    .required(),
  meetup: Joi.number().integer()
>>>>>>> challenge-3
    .required(),
  title: Joi.string().min(5).max(50)
    .required(),
  body: Joi.string().min(5).max(120)
    .required(),
<<<<<<< HEAD
});

const rsvpSchema = Joi.object().keys({
  status: Joi.string().min(3).max(5)
=======
  votes: Joi.number().integer(),
});

const loginSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(50)
    .required(),
  password: Joi.string().alphanum().min(3).max(50)
>>>>>>> challenge-3
    .required(),
});

export default {
  userSchema,
  meetupSchema,
  questionSchema,
<<<<<<< HEAD
  rsvpSchema,
=======
  loginSchema,
>>>>>>> challenge-3
};
