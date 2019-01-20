import bcrypt from 'bcryptjs';

// User class
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
