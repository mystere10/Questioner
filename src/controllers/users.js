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
        status: '201',
        message: 'Thank you for registering',
        user,
      });
    }
  },

  getUsers(req, res) {
    const allusers = userModel.gerUsers();
    if (allusers.length === 0) {
      res.status(404).json({
        status: '404',
        message: 'No user Found',
      });
    } else {
      res.status(200).json({
        status: '200',
        users: allusers,
      });
    }
  },
};

export default Users;
