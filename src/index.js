import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import homepage from './routes/index';
import meetups from './routes/meetup';
import users from './routes/users';
import questions from './routes/questions';

<<<<<<< HEAD
=======
dotenv.config();
>>>>>>> challenge-3

// Init app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));
app.use('/', homepage);
app.use('/api/v1/meetups', meetups);
<<<<<<< HEAD
app.use('/api/v1/users', users);
=======
app.use('/api/v1/auth', users);
>>>>>>> challenge-3
app.use('/api/v1/questions', questions);


// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
<<<<<<< HEAD
      status: '500',
=======
>>>>>>> challenge-3
      message: error.message,
    },
  });
});

// PORT ASSIGNATION
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
