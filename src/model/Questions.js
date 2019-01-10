import uuid from 'uuid/v1';
import moment from 'moment';

class Questions {
  constructor() {
    this.questions = [];
  }

  createQ(data) {
    const newQuestion = {
      id: uuid(),
      createdOn: moment.now(),
      createdBy: data.createdBy,
      meetup: data.meetup,
      title: data.title,
      body: data.body,
      votes: data.votes,
    };
    this.questions.push(newQuestion);
    return newQuestion;
  }

  findQuestion(id) {
    return this.questions.find(voteq => voteq.id === id);
  }

  upvoteQ(id, data) {
    const vote = this.findQuestion(id);

    const index = this.questions.indexOf(vote);
    this.questions[index].votes = data.votes + 1 || vote.votes + 1;

    return this.questions[index];
  }

  downvoteQ(id, data) {
    const vote = this.findQuestion(id);
    const index = this.questions.indexOf(vote);
    const myvote = this.questions[index].votes;
    if (myvote > 0) {
      this.questions[index].votes = data.votes - 1 || vote.votes - 1;
      return this.questions[index];
    }
    return this.questions[index];
  }
}

export default new Questions();
