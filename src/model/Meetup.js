/* eslint-disable no-restricted-syntax */
import moment from 'moment';
import uuid from 'uuid/v1';

class Meetup {
  constructor() {
    this.rsvp = [];
    this.meetups = [
      {
        id: 'e1b1e200-19e4-11e9-938d-5d7455b3fa14',
        createdOn: '1547680644128',
        location: 'musanze',
        images: 'C:/Users/Mystère/Pictures/Emmanuel',
        topic: 'education',
        happeningOn: '2019/02/04 10:30:00',
        tags: [
          'education', 'african education system',
        ],
      },

      {
        id: 'e1b1e200-19e4-11e9-938d-5d7455b3fa15',
        createdOn: '1547680644128',
        location: 'musanze',
        images: 'C:/Users/Mystère/Pictures/Emmanuel',
        topic: 'Nutrution',
        happeningOn: '2019/03/05 10:30:00',
        tags: [
          'masante.com', 'health.org', 'WHO',
        ],
      },

      {
        id: 'e1b1e200-19e4-11e9-938d-5d7455b3fa26',
        createdOn: '1547680644128',
        location: 'musanze',
        images: 'C:/Users/Mystère/Pictures/Emmanuel',
        topic: 'Urbarnization',
        happeningOn: '2019/04/06 10:30:00',
        tags: [
          'city.com',
        ],
      },
    ];
  }

  createMeetup(data) {
    const newMeetup = {
      id: uuid(),
      createdOn: moment.now(),
      location: data.location,
      images: data.images,
      topic: data.topic,
      happeningOn: new Date(data.happeningOn),
      tags: data.tags,
    };
    this.meetups.push(newMeetup);
    return newMeetup;
  }

  getOneMeetup(id) {
    return this.meetups.find(meet => meet.id === id);
  }

  getAll() {
    return this.meetups;
  }

  deleteMeetup(id) {
    const meetup = this.getOneMeetup(id);
    const index = this.meetups.indexOf(meetup);
    this.meetups.splice(index, 1);
    return {};
  }

  RSVP(id, data) {
    const meetup = this.getOneMeetup(id);
    const index = this.meetups.indexOf(meetup);
    const meetupId = this.meetups[index].id;
    const meetuptopic = this.meetups[index].topic;
    const newRSVP = {
      meetup: meetupId,
      topic: meetuptopic,
      status: data.status,
    };
    this.rsvp.push(newRSVP);
    return newRSVP;
  }

  upcomingMeetups() {
    const upcoming = [];
    for (const meetup of this.meetups) {
      if (new Date(meetup.happeningOn) > new Date()) {
        upcoming.push(meetup);
      }
    }
    return upcoming;
  }
}

export default new Meetup();
