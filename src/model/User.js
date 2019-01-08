import moment from 'moment';
import uuid from 'uuid/v1';

class User {
  constructor(id, firstname, lastname, othername, email, phoneNumber, username, registered, isAdmin){
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.othername = othername;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.username = username;
      this.registered = new Date();
      this.isAdmin = isAdmin;
    }
}

export default User;