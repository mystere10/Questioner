import moment from 'moment';
import uuid from 'uuid/v1';

class Meetup {
  constructor(location, images, topic, happeningOn, tags) {
      this.location = location,
      this.images = images,
      this.topic = topic,
      this.happeningOn = new Date(happeningOn),
      this.tags = tags
  }
}

export default Meetup;
