import Joi from 'joi';
import userModel from '../model/User';
import validations from '../helpers/validations';

const Users = {
  register(req, res) {
    const {
      firstname, lastname, othername, email, phoneNumber, username, password,
    } = req.body;

    const { error } = Joi.validate({
      firstname, lastname, othername, email, phoneNumber, username, password,
    }, validations.userSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const user = userModel.createUser(req.body);
      return res.status(201).json({
        message: 'Thank you for registering',
        user,
      });
    }
  },
};

export default Users;
