import moment from 'moment';
import uuid from 'uuid/v1';

class User {
  constructor(firstname, lastname, othername, email, phoneNumber, username){
      this.firstname = firstname;
      this.lastname = lastname;
      this.othername = othername;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.username = username
    }
}

export default User;