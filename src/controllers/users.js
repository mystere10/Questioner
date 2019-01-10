import User from '../model/User';
import validation from '../helpers/validations';
import  db  from '../db/connect';
import queries from '../db/sqlQueries';
import Joi from 'joi';
import uuid from 'uuid/v1';

const Users = {
    register(req, res){
        const {
            firstname, lastname, othername, email, phoneNumber, username
        } = req.body;

        const {error, value} = Joi.validate({
            firstname, lastname, othername, email, phoneNumber, username
        },validation.userSchema);
        
        if (error) {
            res.status(400).json({error: error.details[0].message});
        } else {
            
            const user = new User(firstname, lastname, othername, email, phoneNumber, username);
            const query = db(queries.registrations, [user.firstname, user.lastname, user.othername, user.email, user.phoneNumber, user.username]);
            query.then((response) => {
                 const {
                    firstname, lastname, othername, email, phoneNumber, username
                } = response[0];
                res.status(201).json({
                    message: 'User sucessufully registered',
                    response: {
                        firstname, lastname, othername, email, phoneNumber, username
                    },
                });
            }).catch((error) => {
                res.status(403).send({message: 'Not registered'});
                console.log(error);
            });
        }
    }
};

export default Users;