import moment from 'moment';
import uuid from 'uuid/v1';

class User{
    constructor(){
        this.users = [];
    }

    createUser(data){
        const newUser = {
            id: uuid(),
            firstname: data.firstname,
            lastname: data.lastname,
            othername: data.othername,
            email: data.email,
            phoneNumber: data.phoneNumber,
            username: data.username,
            registered: moment.now(),
            isAdmin: data.isAdmin
        };
        this.users.push(newUser);
        return newUser;
    }

}

export default new User();



