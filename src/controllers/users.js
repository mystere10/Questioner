/* eslint-disable no-shadow */
/* eslint-disable max-len */
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { runInNewContext } from 'vm';
import User from '../model/User';
import validation from '../helpers/validations';
import db from '../db/connect';
import queries from '../db/sqlQueries';

// User registration controller
const Users = {
  register(req, res) {
    const {
      firstname, lastname, othername, email, phoneNumber, username, password,
    } = req.body;

    const { error } = Joi.validate({
      firstname, lastname, othername, email, phoneNumber, username, password,
    }, validation.userSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const checkuseremail = db(queries.useremail, [email]);
      const checkuserphone = db(queries.userphone, [phoneNumber]);
      checkuseremail.then((useresponse) => {
        if (useresponse.length > 0) {
          res.status(409).json({
            error: 'Email exists',
          });
        } else if (useresponse) {
          checkuserphone.then((userresponse) => {
            if (userresponse.length > 0) {
              res.status(409).json({
                error: 'Phone number exists',
              });
            } else {
              const user = new User(firstname, lastname, othername, email, phoneNumber, username, password);
              const query = db(queries.registrations, [user.firstname, user.lastname, user.othername, user.email, user.phoneNumber, user.username, user.password]);
              query.then((response) => {
                jwt.sign({ response: response[0] }, 'secretkey', (err, token) => {
                  const {
                    firstname, lastname, othername, email, phoneNumber, username,
                  } = response[0];
                  res.status(201).json({
                    status: '201',
                    token,
                    message: 'User sucessufully registered',
                    user: {
                      firstname, lastname, othername, email, phoneNumber, username,
                    },
                  });
                });
              }).catch((error) => {
                res.status(500).send({ error });
              });
            }
          }).catch((error) => {
            console.log(error);
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  },

  // User login controller
  login(req, res) {
    const {
      email, password,
    } = req.body;

    const { error } = Joi.validate({
      email, password,
    }, validation.loginSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const query = db(queries.login, [email, password]);
      query.then((response) => {
        if (response.length === 0) {
          res.status(404).send({ message: 'Incorrect username or password' });
        }
        jwt.sign({ response: response[0] }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
          const {
            firstname, lastname, othername, email, phoneNumber, username, isadmin,
          } = response[0];
          res.status(200).json({
            status: '200',
            message: 'Welcome',
            token,
            user: {
              firstname, lastname, othername, email, phoneNumber, username, isadmin,
            },
          });
        });
      }).catch((error) => {
        res.status(500).send({ message: 'an error has occured', error });
      });
    }
  },
};

export default Users;
