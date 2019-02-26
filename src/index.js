import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import homepage from './routes/index';
import meetups from './routes/meetup';
import users from './routes/users';
import questions from './routes/questions';
import path from 'path';

dotenv.config();

// Init app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../UI')));

// Initial routes to defferent controllers
app.use(morgan('dev'));
app.use('/', homepage);
app.use('/api/v1/meetups', meetups);
app.use('/api/v1/auth', users);
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
      status: '500',
      message: error.message,
    },
  });
});

// PORT ASSIGNATION
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
