import userModel from '../model/User';

const Users = {
    register(req, res){
        if(!req.body.firstname && !req.body.lastname && !req.body.othername && !req.body.email && !req.body.phoneNumber && !req.body.username && !req.body.isAdmin){
            return res.status(404).json({
                message: 'Field required'
            });
        }

        const user = userModel.createUser(req.body);
        return res.status(201).json({
            message: 'Thank you for registering',
            user: user
        });
    },

    
}

export default Users;