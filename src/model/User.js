<<<<<<< HEAD
import moment from 'moment';
import uuid from 'uuid/v1';

class User {
  constructor() {
    this.users = [
      {
        id: 'e1b1e200-19e4-11e9-938d-5d7455f4fa14',
        firstname: 'kiriza',
        lastname: 'gege',
        othername: 'kiriza',
        email: 'kriza@gmail.com',
        phoneNumber: '072434794',
        username: 'gege',
      },
      {
        id: 'e1b1e200-19e4-11e9-938d-5d7455f4ca18',
        firstname: 'Umulisa',
        lastname: 'Grace',
        othername: 'kiriza',
        email: 'mulisa@gmail.com',
        phoneNumber: '072434794',
        username: 'mullisa123',
      },
    ];
  }

  createUser(data) {
    const newUser = {
      id: uuid(),
      firstname: data.firstname,
      lastname: data.lastname,
      othername: data.othername,
      email: data.email,
      phoneNumber: data.phoneNumber,
      username: data.username,
      registered: moment.now(),
      isAdmin: data.isAdmin,
    };
    this.users.push(newUser);
    return newUser;
  }

  gerUsers() {
    return this.users;
  }

  getOneUser(id) {
    return this.users.find(user => user.id === id);
  }
}

export default new User();
=======
import bcrypt from 'bcryptjs';

class User {
  constructor(firstname, lastname, othername, email, phoneNumber, username, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.othername = othername;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.username = username;
    this.password = password;
  }
}

export default User;
>>>>>>> challenge-3
