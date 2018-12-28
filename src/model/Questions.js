import uuid from 'uuid/v1';
import moment from 'moment';
import users from './User';
import meetup from './Meetup';

class Questions{
    constructor(){
        this.questions = [];
    }

    createQ(data){
        const newQuestion = {
            id: uuid(),
            createdOn: moment.now(),
            createdBy: data.createdBy,
            meetup: data.meetup,
            title: data.title,
            body: data.body,
            votes: data.votes
        }
        this.questions.push(newQuestion);
        return newQuestion;
    }
}

export default new Questions();