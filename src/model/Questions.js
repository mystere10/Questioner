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

    findQuestion(id){
        return this.questions.find(voteq => voteq.id === id);
    }

    upvoteQ(id, data){
        const vote = this.findQuestion(id)

        const index = this.questions.indexOf(vote);
        let myvote = this.questions[index].votes = data['votes'] + 1 || vote.votes + 1;
            myvote = myvote + 1;
        
        return this.questions[index];
    }
}

export default new Questions();