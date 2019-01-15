/* eslint-disable no-shadow */
/* eslint-disable max-len */
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import User from '../model/User';
import validation from '../helpers/validations';
import db from '../db/connect';
import queries from '../db/sqlQueries';

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
      const user = new User(firstname, lastname, othername, email, phoneNumber, username, password);
      const query = db(queries.registrations, [user.firstname, user.lastname, user.othername, user.email, user.phoneNumber, user.username, user.password]);
      query.then((response) => {
        const {
          firstname, lastname, othername, email, phoneNumber, username,
        } = response[0];
        res.status(201).json({
          message: 'User sucessufully registered',
          response: {
            firstname, lastname, othername, email, phoneNumber, username,
          },
        });
      }).catch((error) => {
        res.status(403).send({ message: 'Not registered' });
        console.log(error);
      });
    }
  },
};

export default Users;
