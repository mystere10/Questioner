const sqlQuery = {};

const adminInfos = 'INSERT INTO registrations(firstname, lastname, othername, email, phonenumber, username, password, isadmin)VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT (email) DO NOTHING';

// Registering a new user
const registrations = 'INSERT INTO registrations(firstname, lastname, othername, email, phonenumber, username, password)VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING * ';

// Creating a meetup
const createMeetup = 'INSERT INTO meetup(location, images, topic, happeningon, tags)VALUES($1,$2,$3,$4,$5) RETURNING * ';

// Creating a question
const createQuestion = 'INSERT INTO question(createdby, meetup, title, body)VALUES($1,$2,$3,$4) RETURNING * ';

// Creating a RSVP
const rsvp = 'INSERT INTO rsvp(meetup, userid, response)VALUES($1,$2,$3) RETURNING * ';

// GET meetup
const getMeetup = 'SELECT * FROM meetup WHERE status = $1';

// GET onemeetup
const getOneMeetup = 'SELECT * FROM meetup WHERE id = $1 AND status = $2';

// GET upcoming meetup
const upcoming = 'SELECT * FROM meetup WHERE happeningon > $1::DATE AND status = $2';

// Upvote
const upvote = 'UPDATE question SET votes = votes + 1 WHERE id = $1';

// Downvote
const downvote = 'UPDATE question SET votes = votes - 1 WHERE id = $1 and votes > 0';

// Delete a meetup (updating the status)
const deletemeetup = 'UPDATE meetup SET status = $1 WHERE id = $2';

// Select users
const getOneUser = 'SELECT * FROM registrations WHERE id = $1';

// Select question id
const getOneQuestion = 'SELECT * FROM question WHERE id = $1';

// Login
const login = 'SELECT * FROM registrations WHERE email = $1 and password = $2';

// Questions for a specific meetup
const questionMeetup = 'SELECT * FROM question WHERE meetup = $1';

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
sqlQuery.login = login;
sqlQuery.questionMeetup = questionMeetup;
sqlQuery.adminInfos = adminInfos;

export default sqlQuery;
