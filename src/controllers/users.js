import User from '../model/User';
import validation from '../helpers/validations';
import execute from '../db/connect';
import queries from '../db/sqlQueries';
import Joi from 'joi';
import uuid from 'uuid/v1';

const Users = {
    register(req, res){
        const {
            firstname, lastname, othername, email, phoneNumber, username, isAdmin
        } = req.body;

        const {error, value} = Joi.validate({
            firstname, lastname, othername, email, phoneNumber, username, isAdmin
        },validation.userSchema);
        
        if (error) {
            res.status(400).json({error: error.details[0].message});
        } else {
            const id = uuid();
            const user = new User(id, firstname, lastname, othername, email, phoneNumber, username, isAdmin);
            const query = execute(queries.signup, [user.id, user.firstname, user.lastname, user.othername, user.email, user.phoneNumber, user.username, isAdmin]);
            query.then((response) => {
                res.status(201).json({
                    message: 'User sucessufully registered',
                    response: {
                        id, firstname, lastname, othername, email, phoneNumber, username
                    },
                });
            }).catch((error) => {
                res.status(404).send({
                   error 
                });
            });
        }
    },
    
}

export default Users;