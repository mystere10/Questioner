
const sqlQuery = {};

// Registering a new user
const registrations = 'INSERT INTO registrations(firstname, lastname, othername, email, phonenumber, username)VALUES($1,$2,$3,$4,$5,$6) RETURNING * ';

// Creating a meetup
const createMeetup = 'INSERT INTO meetup(location, images, topic, happeningon, tags)VALUES($1,$2,$3,$4,$5) RETURNING * ';

// Creating a question
const createQuestion = 'INSERT INTO question(createdby, meetup, title, body, votes)VALUES($1,$2,$3,$4,$5) RETURNING * ';

// Creating a RSVP
const rsvp = 'INSERT INTO rsvp(meetup, userid, response)VALUES($1,$2,$3) RETURNING * ';

// GET meetup
const getMeetup = 'SELECT * FROM meetup WHERE status = $1';

// GET onemeetup
const getOneMeetup = 'SELECT * FROM meetup WHERE id = $1 AND status = $2';

// GET upcoming meetup
const upcoming = 'SELECT * FROM meetup WHERE happeningon > $1::DATE';

// Upvote
const upvote = 'UPDATE question SET votes = votes + 1 WHERE id = $1';

// Downvote
const downvote = 'UPDATE question SET votes = votes - 1 WHERE id = $1 and votes > 0';

// Delete a meetup (updating the status)
const deletemeetup = 'UPDATE meetup SET status = $1 WHERE id = $2 RETURNING * ';

// Select users
const getOneUser = 'SELECT * FROM registrations WHERE id = $1';

// Select question id
const getOneQuestion = 'SELECT * FROM question WHERE id = $1';

sqlQuery.registrations = registrations;
sqlQuery.createMeetup = createMeetup;
sqlQuery.createQuestion = createQuestion;
sqlQuery.rsvp = rsvp;
sqlQuery.getMeetup = getMeetup;
sqlQuery.getOneMeetup = getOneMeetup;
sqlQuery.upcoming = upcoming;
sqlQuery.upvote = upvote;
sqlQuery.downvote = downvote;
sqlQuery.deletemeetup = deletemeetup;
sqlQuery.getOneUser = getOneUser;
sqlQuery.getOneQuestion = getOneQuestion;

export default sqlQuery;
