import moment from 'moment';
import uuid from 'uuid/v1';
import { create } from 'domain';

class Meetup{
    constructor(){
        this.meetups = [];
    }

    createMeetup(data) {
        const newMeetup = {
            id: uuid(),
            createdOn: moment.now(),
            location: data.location,
            images: data.images,
            topic: data.topic,
            happeningOn: moment.now(),
            tags: data.tags
        };
        this.meetups.push(newMeetup);
        return newMeetup;
    }

    getOneMeetup(id){
        return this.meetups.find(meet => meet.id === id);
    }

    getAll(){
        return this.meetups;
      }

    deleteMeetup(id){
        const meetup = this.getOneMeetup(id);
        const index = this.meetups.indexOf(meetup);
        this.meetups.splice(index, 1);
        return {};
    }

    RSVP(id, data){
        const meetup = this.getOneMeetup(id);
        const index = this.meetups.indexOf(meetup);
        let meetupId = this.meetups[index].id = data['id'] || meetup.id;
        let meetuptopic = this.meetups[index].topic = data['topic'] || meetup.topic;
        const newRSVP = {
            meetup: meetupId,
            topic: meetuptopic,
            status: data.status
        }
        this.meetups.push(newRSVP);
        return newRSVP;
    }

    upcomingMeetups(){
        
        return this.getAll();
    } 
}

export default new Meetup();