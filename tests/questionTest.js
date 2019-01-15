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
      createdBy: 'f98ef240-0aa4-11e9-9315-0fcfc3931fe8',
      meetup: '356083b0-0aa5-11e9-9315-0fcfc3931fe8',
      title: 'EDUCATION',
      body: 'The quality of education...',
      votes: 4,
    };
    chai.request(index)
      .post('/api/v1/questions/')
      .send(newQuestion)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.question.should.have.property('createdBy');
        res.body.question.should.have.property('meetup');
        res.body.question.should.have.property('title');
        res.body.question.should.have.property('body');
        id = res.body.question.id;
        done();
      });
  });

  it('should upvote a question', (done) => {
    chai.request(index)
      .patch(`/api/v1/questions/${id}/upvote`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.question.should.have.property('createdBy');
        res.body.question.should.have.property('meetup');
        res.body.question.should.have.property('body');
        res.body.question.should.have.property('votes').eql(5);
        done();
      });
  });

  it('should downvote a question', (done) => {
    chai.request(index)
      .patch(`/api/v1/questions/${id}/downvote`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.question.should.have.property('createdBy');
        res.body.question.should.have.property('meetup');
        res.body.question.should.have.property('body');
        res.body.question.should.have.property('votes').eql(4);
        done();
      });
  });
});
