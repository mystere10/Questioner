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
const upvote = 'INSERT INTO votes(userid, question, upvote)VALUES($1,$2,$3) RETURNING * ';

// Downvote
const downvote = 'INSERT INTO votes(userid, question, downvote)VALUES($1,$2,$3) RETURNING * ';

// Delete a meetup (updating the status)
const deletemeetup = 'UPDATE meetup SET status = $1 WHERE id = $2';

// Select users
const getOneUser = 'SELECT * FROM registrations WHERE id = $1';

// Select question id
const getOneQuestion = 'SELECT * FROM question WHERE id=$1';

// Counting up votes
const countingupVotes = 'select question.id, question.createdon, question.createdby, question.meetup, question.title, question.body, votes.upvote, votes.question, COUNT(votes.upvote) AS upvotes_sum from question, votes where votes.upvote=1 and votes.question=question.id GROUP BY question.id, question.createdon, question.createdby, question.meetup, question.title, question.body, votes.question, votes.upvote, votes.downvote';

// Countingdown votes
const countingdownVotes = 'select question.id, question.createdon, question.createdby, question.meetup, question.title, question.body, votes.downvote, votes.question, COUNT(votes.downvote) AS downvote_sum from question, votes where votes.downvote=1 and votes.question=question.id GROUP BY question.id, question.createdon, question.createdby, question.meetup, question.title, question.body, votes.question, votes.downvote';

// Login
const login = 'SELECT * FROM registrations WHERE email = $1 and password = $2';

// Questions for a specific meetup
const questionMeetup = 'SELECT * FROM question WHERE meetup = $1';

// Find if a user voted
const checkifvoted = 'SELECT * FROM votes WHERE userid = $1 AND question = $2';

// Delete voted user
const deletevoteduser = 'DELETE FROM votes WHERE userid = $1 and question = $2';

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
sqlQuery.checkifvoted = checkifvoted;
sqlQuery.deletevoteduser = deletevoteduser;
sqlQuery.countingupVotes = countingupVotes;
sqlQuery.countingdownVotes = countingdownVotes;

export default sqlQuery;
