import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../src/index';
import { error } from 'util';
import Meetup from '../src/model/Meetup';
import { EWOULDBLOCK } from 'constants';

const should = chai.should();

chai.use(chaiHttp);

describe('Meetup endpoint test', () => {
    let id;
    it('should create a meetup', (done) => {
        const newMeetup = {
            location: 'Musanze',
            images: 'C:/Users/Mystère/Pictures',
            topic: 'Education',
            happeningOn: '10/1/2019',
            tags: 'Hi'
        };
        chai.request(index)
        .post('/api/v1/meetup')
        .send(newMeetup)
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.have.property('id');
            res.body.data.should.have.property('location');
            res.body.data.should.have.property('topic');
            res.body.data.should.have.property('happeningOn');
            res.body.data.should.have.property('tags');
            id = res.body.data.id;
            done();
        });
    });

    it('should list all meetups created', (done) => {
        chai.request(index)
        .get('/api/v1/meetup/')
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            done();
        });
    });

    it('should return a meetup with a specific id', (done) => {
        chai.request(index)
        .get(`/api/v1/meetup/${id}`)
        .end((err, res)=>{
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
        const srvp = {
            status: 'Yes'
        };

        chai.request(index)
        .post(`/api/v1/meetup/${id}/rsvps`)
        .send(srvp)
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.response.should.have.property('meetup');
            res.body.response.should.have.property('topic');
            res.body.response.should.have.property('status');
            done();
        });
    });

    it('should return upcoming meetups', (done) => {
        chai.request(index)
        .get('/api/v1/meetup/upcoming/meetups')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            done();
        });
    }); 
        

    it('should delete a specific meetup', (done) => {
        chai.request(index)
            .get('/api/v1/meetup')
            .end((res, err) => {
                chai.request(index)
                .delete(`/api/v1/meetup/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Meetup deleted');
                    done();
                });
            });
        });
});