import execute from './connect';

const sqlQuery = {};

const signup = `CREATE TABLE IF NOT EXISTS
registrations(
    id UUID PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phoneNumber VARCHAR(10) NOT NULL,
    username VARCHAR(15) NOT NULL,
    registered TIMESTAMP,
    isAdmin boolean NOT NULL default 0
);`;

const meetup = `CREATE TABLE IF NOT EXISTS
meetup(
    id UUID PRIMARY KEY,
    createdOn TIMESTAMP,
    location VARCHAR(50) NOT NULL,
    images VARCHAR(128),
    topic VARCHAR(128) NOT NULL,
    happeningOn DATE NOT NULL,
    tags VARCHAR(128)
);`;

const question = `CREATE TABLE IF NOT EXISTS
question(
    id UUID PRIMARY KEY,
    createdOn TIMESTAMP,
    createdBy UUID REFERENCES registrations(id),
    meetup UUID REFERENCES meetup(id),
    title VARCHAR(50) NOT NULL,
    body VARCHAR(128) NOT NULL,
    votes INTEGER
);`;

const rsvp = `CREATE TABLE IF NOT EXISTS
rsvp(
    id UUID PRIMARY KEY,
    meetup UUID REFERENCES meetup(id),
    user UUID REFERENCES registrations(id),
    response VARCHAR(128) NOT NULL
);`;

if(require.main === module){
    execute(signup);
    execute(meetup);
    execute(question);
    execute(rsvp);
}

// Registering a new user
const registration = 'INSERT INTO registrations(id, firstname, lastname, othername, email, phoneNumber, username, registered, isAdmin)VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING * ';

// Creating a meetup
const createMeetup = 'INSERT INTO meetup(id, createdOn, location, images, topic, happeningOn, tags)VALUES($1, $2, $3, $4, $5, $6) RETURNING * ';

// Creating a question
const createQuestion = 'INSERT INTO question(id, createdOn, createdBy, meetup, title, body, votes)VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING * ';

// Creating a RSVP
const srvp = 'INSERT INTO rsvp(id, meetup, user, response)VALUES(id, meetup, user, response) RETURNING *';

// GET meetup
const getMeetup = 'SELECT * FROM meetup';

// GET onemeetup
const getOneMeetup = 'SELECT * FROM meetup WHERE id = $1';

// GET upcoming meetup
const upcoming = 'SELECT * FROM meetup WHERE happeingOn = $1';

// Upvote
const upvote = 'UPDATE question SET votes = $1 WHERE id = $1';

// Downvote
const downvote = 'UPDATE question SET votes = $1 WHERE id = $1';

sqlQuery.registration = registration;
sqlQuery.createMeetup = createMeetup;
sqlQuery.createQuestion = createQuestion;
sqlQuery.srvp = srvp;
sqlQuery.getMeetup = getMeetup;
sqlQuery.getOneMeetup =getOneMeetup;
sqlQuery.upcoming = upcoming;
sqlQuery.upvote = upvote;
sqlQuery.downvote = downvote;

export default sqlQuery;