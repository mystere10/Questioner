
const sqlQuery = {};

// Registering a new user
const registrations = 'INSERT INTO registrations(firstname, lastname, othername, email, phonenumber, username)VALUES($1,$2,$3,$4,$5,$6) RETURNING * ';

// Creating a meetup
const createMeetup = 'INSERT INTO meetup(location, images, topic, happeningon, tags)VALUES($1,$2,$3,$4,$5) RETURNING * ';

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

sqlQuery.registrations = registrations;
sqlQuery.createMeetup = createMeetup;
sqlQuery.createQuestion = createQuestion;
sqlQuery.srvp = srvp;
sqlQuery.getMeetup = getMeetup;
sqlQuery.getOneMeetup =getOneMeetup;
sqlQuery.upcoming = upcoming;
sqlQuery.upvote = upvote;
sqlQuery.downvote = downvote;

export default sqlQuery;