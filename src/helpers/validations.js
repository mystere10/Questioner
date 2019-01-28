import Joi from 'joi';

// Validations for users
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

// Validations for meetups
const meetupSchema = Joi.object().keys({
  location: Joi.string().alphanum().min(3).max(50)
    .required(),
  images: Joi.string(),

  topic: Joi.string().alphanum().min(3).max(50)
    .required(),
  happeningOn: Joi.date()
    .required(),

  tags: Joi.array().items(Joi.string().min(3)),
});

// Validations for questions
const questionSchema = Joi.object().keys({
  meetupId: Joi.number().integer()
    .required(),
  createdBy: Joi.number().integer()
    .required(),
  title: Joi.string().min(5).max(50)
    .required(),
  body: Joi.string().min(5).max(120)
    .required(),
  upvote: Joi.number().integer(),
  downvote: Joi.number().integer(),
});

// Validation for login info
const loginSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtomas: 2 })
    .required(),
  password: Joi.string().alphanum().min(3).max(50)
    .required(),
});

// Validating comments
const commentSchema = Joi.object().keys({
  questionId: Joi.number()
    .required(),
  comment: Joi.string()
    .required(),
});

// Validating get.params.id for questions
const questionParams = Joi.object().keys({
  questionId: Joi.number()
    .required(),
});

// Validating get.params.id for meetups
const meetupParams = Joi.object().keys({
  meetupId: Joi.number().integer()
    .required(),
});

const rvspSchema = Joi.object().keys({
  meetupId: Joi.number().integer()
    .required(),
  status: Joi.string().valid('yes', 'no', 'maybe')
    .required(),
});

export default {
  userSchema,
  meetupSchema,
  questionSchema,
  loginSchema,
  questionParams,
  meetupParams,
  commentSchema,
  rvspSchema,
};
