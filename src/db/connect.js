const { Pool } = require('pg');
const dotenv = require('dotenv');
import '@babel/polyfill';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
});

const connect = async () => pool.connect();

// const pool = connectionString ? new Pool({connectionString}): new Pool(connection);

// const connect = () => new Promise(async (resolve, reject) => {
//     try {
//       pool.connect()
//         .then(() => console.log('connected'))
//         .catch((error) => console.log(error));
//     } catch(error) {
//       console.log(error);
//     }
//   });

// const execute = {
//     connect,
//     query: (text, params) => pool.query(text, params),
// }

const execute = async (sql, data = []) => {
    const connection = await connect();
    try {
      // wait for the query using await
      const result = await connection.query(sql, data);
      return result.rows;
    } catch (error) {
      // Error handling
      console.log(error.message);
    } finally {
      // close the pool or the databasee
      connection.release();
  }
};


export default execute;