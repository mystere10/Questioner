<<<<<<< HEAD
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import uuid from 'uuid/v1';
import moment from 'moment';
import { BADRESP } from 'dns';

class Questions {
  constructor() {
    this.upvoteData = [];
    this.downvoteData = [];
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
        downvote: 5,
      },
    ];
  }

  createQ(id, data) {
    const newQuestion = {
      id: uuid(),
      createdOn: moment.now(),
      createdBy: data.createdBy,
      meetup: id,
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

  upvoteQ(id, data, user) {
    const upvote = this.findQuestion(id);
    const index = this.questions.indexOf(upvote);

    const downvote = this.findQuestion(id);
    const index2 = this.questions.indexOf(downvote);

    if (this.upvoteData.indexOf(user) === -1 && this.downvoteData.indexOf(user) === -1) {
      this.upvoteData.push(user);
      this.questions[index].upvote = data.upvote + 1 || upvote.upvote + 1;
    } else if (this.upvoteData.indexOf(user) === -1 && this.downvoteData.indexOf(user) !== -1) {
      this.downvoteData.splice(index, 1);
      this.questions[index2].downvote = data.downvote - 1 || downvote.downvote - 1;
      if (this.questions[index].upvote > 0) {
        this.questions[index].upvote = data.upvote - 1 || upvote.upvote - 1;
      }
    } else if (this.upvoteData.indexOf(user) !== -1) {
      this.upvoteData.splice(index, 1);
      this.questions[index].upvote = data.upvote - 1 || upvote.upvote - 1;
    }
    const vote = this.questions[index];
    const votedUser = this.upvoteData;
    return { vote, votedUser };
  }

  downvoteQ(id, data, user) {
    const downvote = this.findQuestion(id);
    const index = this.questions.indexOf(downvote);

    const upvote = this.findQuestion(id);
    const index2 = this.questions.indexOf(upvote);

    if (this.downvoteData.indexOf(user) === -1 && this.upvoteData.indexOf(user) === -1) {
      this.downvoteData.push(user);
      this.questions[index].downvote = data.downvote + 1 || downvote.downvote + 1;
    } else if (this.downvoteData.indexOf(user) === -1 && this.upvoteData.indexOf(user) !== -1) {
      this.upvoteData.splice(index, 1);
      if (this.questions[index2].upvote > 0) {
        this.questions[index2].upvote = data.upvote - 1 || downvote.upvote - 1;
      }
      this.questions[index].downvote = data.downvote + 1 || downvote.downvote + 1;
    } else if (this.downvoteData.indexOf(user) !== -1) {
      this.downvoteData.splice(index, 1);
      this.questions[index].downvote = data.downvote - 1 || upvote.downvote - 1;
    }
    const vote = this.questions[index];
    const votedUser = this.downvoteData;
    return { vote, votedUser };
  }

  getAllQuestions(meetup) {
    return this.questions.filter(meet => meet.meetup === meetup);
=======
class Questions {
  constructor(createdBy, meetup, title, body, votes) {
    this.createdBy = createdBy;
    this.meetup = meetup;
    this.title = title;
    this.body = body;
    this.votes = votes;
>>>>>>> challenge-3
  }
}

export default Questions;
