/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../src/index';

const should = chai.should();

chai.use(chaiHttp);

describe('Meetup endpoint test', () => {
  let id;
  it('should create a meetup', (done) => {
    const newMeetup = {
      id: 'e1b1e200-19e4-11e9-938d-5d7455b3fa14',
      createdOn: '1547680644128',
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
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('meetup');
        res.body.meetup.should.have.property('id');
        res.body.meetup.should.have.property('location');
        res.body.meetup.should.have.property('topic');
        res.body.meetup.should.have.property('happeningOn');
        res.body.meetup.should.have.property('tags');
        id = res.body.meetup.id;
        done();
      });
  });

  it('should list all meetups created', (done) => {
    chai.request(index)
      .get('/api/v1/meetups/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return a meetup with a specific id', (done) => {
    chai.request(index)
      .get(`/api/v1/meetups/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.meetup.should.have.property('id');
        res.body.meetup.should.have.property('topic');
        res.body.meetup.should.have.property('location');
        res.body.meetup.should.have.property('happeningOn');
        res.body.meetup.should.have.property('tags');
        done();
      });
  });

  it('should respond to a meetup', (done) => {
    const rsvp = {
      user: 'e1b1e200-19e4-11e9-938d-5d7455f4fa14',
      status: 'Yes',
    };

    chai.request(index)
      .post(`/api/v1/meetups/${id}/rsvps`)
      .send(rsvp)
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
      .get('/api/v1/meetups/upcoming/meetups')
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
