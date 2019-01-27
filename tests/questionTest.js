/* eslint-disable no-undef */
import chai from 'chai';
import http from 'chai-http';
import index from '../src/index';
import db from '../src/db/connect';
import queries from '../src/db/sqlQueries';

const should = chai.should();

chai.use(http);

describe('Question tests', () => {
  let userToken;
  it('should signup in the system', (done) => {
    const user = {
      firstname: 'ishara',
      lastname: 'innocent',
      othername: 'mystere',
      email: 'ishara45@gmail.com',
      phoneNumber: '0782133455',
      username: 'caleb',
      password: 'kama1234',
    };
    chai.request(index)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, res) => {
        res.body.should.be.a('object');
        res.should.have.status(201);
        userToken = res.body.token;
        if (error) done(error);
        done();
      });
  });

  let adminToken;
  it('should login the system', (done) => {
    const admin = {
      email: 'nkunziinnocent@gmail.com',
      password: 'mystere123',
    };
    chai.request(index)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((error, res) => {
        res.body.should.be.a('object');
        res.should.have.status(200);
        adminToken = res.body.token;
        if (error) done(error);
        done();
      });
  });

  let meetupId;
  it('should create a meetup', (done) => {
    const newMeetup = {
      id: 53,
      location: 'musanze',
      images: 'C:/Users/Mystère/Pictures/Emmanuel',
      topic: 'education',
      happeningOn: '2019/02/23 10:30:00',
      tags: [
        'education', 'african education system',
      ],
    };
    chai.request(index)
      .post('/api/v1/meetups')
      .send(newMeetup)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('response');
        res.body.response.should.have.property('id');
        res.body.response.should.have.property('location');
        res.body.response.should.have.property('topic');
        res.body.response.should.have.property('happeningon');
        res.body.response.should.have.property('tags');
        meetupId = res.body.response.id;
        done();
      });
  });

  let questionId;
  it('should create a question', (done) => {
    const newQuestion = {
      id: 1,
      title: 'Health',
      body: 'Health is',
      upvote: 0,
      downvote: 0,
    };
    chai.request(index)
      .post(`/api/v1/meetups/${meetupId}/questions/`)
      .send(newQuestion)
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('response');
        res.body.response.should.have.property('meetup');
        res.body.response.should.have.property('title');
        res.body.response.should.have.property('body');
        questionId = res.body.response.meetup;
        done();
      });
  });


  it('should upvote a question', (done) => {
    chai.request(index)
      .patch(`/api/v1/${questionId}/upvote`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('question');
        res.body.question.should.have.property('id');
        res.body.question.should.have.property('createdBy');
        res.body.question.should.have.property('meetup');
        res.body.question.should.have.property('title');
        res.body.question.should.have.property('body');
        res.body.question.should.have.property('upvote').eql(1);
        done();
      });
  });

  it('should downvote a question', (done) => {
    chai.request(index)
      .patch(`/api/v1/${questionId}/downvote`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.question.should.have.property('id');
        res.body.question.should.have.property('createdBy');
        res.body.question.should.have.property('meetup');
        res.body.question.should.have.property('title');
        res.body.question.should.have.property('body');
        res.body.question.should.have.property('downvote').eql(0);
        done();
      });
  });

  it('should get questions per meetup', (done) => {
    chai.request(index)
      .get(`/api/v1/questions/${meetupId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('questions');
        res.body.questions.should.be.a('array');
        done();
      });
  });
});

after('Truncating table', () => db(queries.truncateRegistration));
