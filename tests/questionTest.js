/* eslint-disable no-undef */
import chai from 'chai';
import http from 'chai-http';
import index from '../src/index';

const should = chai.should();

chai.use(http);

describe('Question tests', () => {
  let id;
  it('should create a question', (done) => {
    const newQuestion = {
      id: 1,
      title: 'Health',
      body: 'Health is',
      upvote: 0,
      downvote: 0,
    };
    chai.request(index)
      .post('/api/v1/meetups/e1b1e200-19e4-11e9-938d-5d7455b3fa14/questions')
      .send(newQuestion)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('question');
        res.body.question.should.have.property('id');
        res.body.question.should.have.property('createdBy');
        res.body.question.should.have.property('title');
        res.body.question.should.have.property('body');
        res.body.question.should.have.property('upvote');
        res.body.question.should.have.property('downvote');
        id = res.body.question.id;
        done();
      });
  });


  it('should upvote a question', (done) => {
    const upvote = {
      user: 'e1b1e200-19e4-11e9-938d-5d7455f4ca18',
    };
    chai.request(index)
      .patch('/api/v1/1/upvote')
      .send(upvote)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('question');
        res.body.question.vote.should.have.property('id');
        res.body.question.vote.should.have.property('createdBy');
        res.body.question.vote.should.have.property('title');
        res.body.question.vote.should.have.property('body');
        res.body.question.vote.should.have.property('upvote').eql(1);
        res.body.question.vote.should.have.property('downvote').eql(6);
        done();
      });
  });

  it('should downvote a question', (done) => {
    chai.request(index)
      .patch('/api/v1/1/downvote')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.question.vote.should.have.property('id');
        res.body.question.vote.should.have.property('createdBy');
        res.body.question.vote.should.have.property('title');
        res.body.question.vote.should.have.property('body');
        res.body.question.vote.should.have.property('upvote').eql(0);
        res.body.question.vote.should.have.property('downvote').eql(6);
        done();
      });
  });

  it('should get questions per meetup', (done) => {
    chai.request(index)
      .get('/api/v1/meetup/1/questions')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('questions');
        res.body.should.have.property('id');
        res.body.questions.should.have.property('createdOn');
        res.body.questions.should.have.property('createdBy');
        res.body.questions.should.have.property('meetup');
        res.body.questions.should.have.property('title');
        res.body.questions.should.have.property('body');
        res.body.questions.should.have.property('upvote');
        res.body.questions.should.have.property('downvote');
        done();
      });
  });
});
