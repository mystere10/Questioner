/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
import '@babel/polyfill';
import sqlQueries from './sqlQueries';

const { Pool } = require('pg');
const dotenv = require('dotenv');


dotenv.config();

// Databse infos
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
});

const connect = async () => await pool.connect();

// Tables to be used
const defaultDatabases = async () => {
  const admininfo = [
    process.env.ADMIN_FIRSTNAME,
    process.env.ADMIN_LASTNAME,
    process.env.ADMIN_OTHER,
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_PHONENUMBER,
    process.env.ADMIN_USERNAME,
    process.env.ADMIN_PASSWORD,
    process.env.IS_ADMIN,
  ];

  const signup = `CREATE TABLE IF NOT EXISTS
registrations(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    othername VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL,
    phonenumber VARCHAR(10) UNIQUE NOT NULL,
    username VARCHAR(15) NOT NULL,
    password VARCHAR(50) NOT NULL,
    registered TIMESTAMP default current_timestamp,
    isAdmin BOOLEAN NOT NULL default FALSE
);`;

  const meetup = `CREATE TABLE IF NOT EXISTS
meetup(
    id SERIAL PRIMARY KEY,
    createdon TIMESTAMP default current_timestamp,
    location VARCHAR(50) NOT NULL,
    images VARCHAR(128),
    topic VARCHAR(128) NOT NULL,
    happeningon DATE NOT NULL UNIQUE,
    tags text[],
    status VARCHAR(15) DEFAULT 'ACTIVE'
);`;

  const question = `CREATE TABLE IF NOT EXISTS
question(
    id SERIAL PRIMARY KEY,
    createdon TIMESTAMP default current_timestamp,
    createdby INTEGER REFERENCES registrations(id),
    meetup INTEGER REFERENCES meetup(id),
    title VARCHAR(50) NOT NULL,
    body TEXT NOT NULL,
    upvote INTEGER DEFAULT 0,
    downvote INTEGER DEFAULT 0
);`;

  const rsvp = `CREATE TABLE IF NOT EXISTS
rsvp(
    id SERIAL PRIMARY KEY,
    meetup INTEGER REFERENCES meetup(id),
    userid INTEGER REFERENCES registrations(id),
    response VARCHAR(128) NOT NULL
);`;

  const vote = `CREATE TABLE IF NOT EXISTS
votes(
  id SERIAL PRIMARY KEY,
  userid INTEGER REFERENCES registrations(id),
  question INTEGER REFERENCES question(id),
  upvote INTEGER DEFAULT 0,
  downvote INTEGER DEFAULT 0
);`;

  const connection = await connect();
  await connection.query(signup);
  await connection.query(meetup);
  await connection.query(question);
  await connection.query(rsvp);
  await connection.query(vote);
  await connection.query(sqlQueries.adminInfos, admininfo);
};

const dropTables = async () => {
  const dropAlltables = 'DROP TABLE IF EXISTS registrations, meetup, question, rsvp CASCADE';

  const connection = await connect();
  await connection.query(dropAlltables);
};

defaultDatabases();

// export default connect;
const db = async (sql, data = []) => {
  const connection = await connect();
  try {
    const result = await connection.query(sql, data);
    return result.rows;
  } catch (error) {
    // console.log(error.message);
  } finally {
    // close the pool or the databasee
    connection.release();
  }
};

export default db;
