/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../src/index';
import db from '../src/db/connect';
import queries from '../src/db/sqlQueries';

const should = chai.should();

chai.use(chaiHttp);

describe('Meetup endpoint test', () => {
  let id;
  let clinentToken;
  before('Create a user', (done) => {
    const newUser = {
      firstname: 'gege',
      lastname: 'gege',
      othername: 'kiriza',
      email: 'gege@gmail.com',
      phoneNumber: '0724343434',
      username: 'gege',
      password: 'gege1234',
    };
    chai.request(index)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((error, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        id = res.body.user;
        clinentToken = res.body.token;
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
      id: 2,
      location: 'musanze',
      images: 'C:/Users/Mystère/Pictures/Emmanuel',
      topic: 'education',
      happeningOn: '2019/02/04 10:30:00',
      tags: [
        'education', 'african education system',
      ],
    };
    chai.request(index)
      .post('/api/v1/meetups')
      .send(newMeetup)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('meetup');
        res.body.response.should.have.property('id');
        res.body.response.should.have.property('location');
        res.body.response.should.have.property('topic');
        res.body.response.should.have.property('happeningOn');
        res.body.response.should.have.property('tags');
        meetupId = res.body.response.id;
        console.log(meetupId);
        done();
      });
  });

  it('should list all meetups created', (done) => {
    chai.request(index)
      .get('/api/v1/meetups/')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        // console.log(adminToken);
        // console.log(res.body);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return a meetup with a specific id', (done) => {
    chai.request(index)
      .get(`/api/v1/meetups/${meetupId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.should.be.json();
        res.body.should.be.a('object');
        res.body.response.should.have.property('id');
        res.body.response.should.have.property('topic');
        res.body.response.should.have.property('location');
        res.body.response.should.have.property('happeningOn');
        res.body.response.should.have.property('tags');
        done();
      });
  });

  it('should respond to a meetup', (done) => {
    const rsvp = {
      status: 'Yes',
    };

    chai.request(index)
      .post(`/api/v1/meetups/${meetupId}/rsvps`)
      .send(rsvp)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.response.should.have.property('meetup');
        res.body.response.should.have.property('topic');
        res.body.response.should.have.property('status');
        done();
      });
  });

  it('should return upcoming meetups', (done) => {
    chai.request(index)
      .get('/api/v1/meetups/upcoming/')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
  });

  it('should delete a specific meetup', (done) => {
    chai.request(index)
      .get('/api/v1/meetups')
      .end((res, err) => {
        chai.request(index)
          .delete(`/api/v1/meetups/${id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Meetup successfully deleted');
            done();
          });
      });
  });
});

after('Truncating table', () => db(queries.truncateRegistration));
