import uuid from 'uuid/v1';
import moment from 'moment';

class Questions {
  constructor() {
    this.questions = [
      {
        id: 'e1b1e200-19e4-11e9-938d-5d7455c4fa14',
        createdBy: 'e1b1e200-19e4-11e9-938d-5d7455f4fa14',
        title: 'Education',
        body: 'Can education be...',
        upvote: 0,
        downvote: 6,
      },
      {
        id: 'e1b1e200-19e4-11e9-938d-5d7455c4fa15',
        createdBy: 'e1b1e200-19e4-11e9-938d-5d7455b3fa26',
        title: 'Health',
        body: 'Health is',
        upvote: 0,
        downvote: 0,
      },
    ];
  }

  createQ(data) {
    const newQuestion = {
      id: uuid(),
      createdOn: moment.now(),
      createdBy: data.createdBy,
      meetup: data.meetup,
      title: data.title,
      body: data.body,
      upvote: 0,
      downvote: 0,
    };
    this.questions.push(newQuestion);
    return newQuestion;
  }

  findQuestion(id) {
    return this.questions.find(voteq => voteq.id === id);
  }

  upvoteQ(id, data) {
    const upvote = this.findQuestion(id);
    const index = this.questions.indexOf(upvote);
    this.questions[index].upvote = data.upvote + 1 || upvote.upvote + 1;

    return this.questions[index];
  }

  downvoteQ(id, data) {
    const downvote = this.findQuestion(id);
    const index = this.questions.indexOf(downvote);
    const myvote = this.questions[index].downvotes;
    if (myvote > 0) {
      this.questions[index].downvote = data.downvote - 1 || downvote.downvote - 1;
      return this.questions[index];
    }
    return this.questions[index];
  }

  getAllQuestions() {
    return this.questions;
  }
}

export default new Questions();
