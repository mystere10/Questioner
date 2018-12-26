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
}

export default new Meetup();