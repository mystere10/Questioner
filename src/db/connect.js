/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
import '@babel/polyfill';

const { Pool } = require('pg');
const dotenv = require('dotenv');


dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
});

const connect = async () => await pool.connect();

const defaultDatabases = async () => {
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
    happeningon TIMESTAMP NOT NULL UNIQUE,
    tags VARCHAR(128),
    status VARCHAR(15) DEFAULT 'ACTIVE'
);`;

  const question = `CREATE TABLE IF NOT EXISTS
question(
    id SERIAL PRIMARY KEY,
    createdon TIMESTAMP default current_timestamp,
    createdby INTEGER REFERENCES registrations(id),
    meetup INTEGER REFERENCES meetup(id),
    title VARCHAR(50) NOT NULL,
    body VARCHAR(128) NOT NULL,
    votes INTEGER DEFAULT 0
);`;

  const rsvp = `CREATE TABLE IF NOT EXISTS
rsvp(
    id SERIAL PRIMARY KEY,
    meetup INTEGER REFERENCES meetup(id),
    userid INTEGER REFERENCES registrations(id),
    response VARCHAR(128) NOT NULL
);`;

  const connection = await connect();
  await connection.query(signup);
  await connection.query(meetup);
  await connection.query(question);
  await connection.query(rsvp);
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
    console.log(error.message);
  } finally {
    // close the pool or the databasee
    connection.release();
  }
};

export default db;
