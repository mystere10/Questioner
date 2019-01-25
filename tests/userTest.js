/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../src/index';
import db from '../src/db/connect';
import queries from '../src/db/sqlQueries';

const should = chai.should();

chai.use(chaiHttp);

describe('Truncating the tables before inserting new data', () => {
  // beforeEach('Truncating table', () => db(queries.truncateRegistration));

  // before('Create a user', (done) => {
  //   const newUser = {
  //     firstname: 'gege',
  //     lastname: 'gege',
  //     othername: 'kiriza',
  //     email: 'gege@gmail.com',
  //     phoneNumber: '0724343434',
  //     username: 'gege',
  //     password: 'gege1234',
  //   };
  //   chai.request(index)
  //     .post('/api/v1/auth/signup')
  //     .send(newUser)
  //     .end((error, res) => {
  //       if (error) done(error);
  //       console.log(error);
  //       const { id } = res.body.user;
  //       done();
  //     });
  // });
});

// describe('user endpoint test', () => {
//   let id;
//   it('should register a user', (done) => {
//     const newUser = {
//       firstname: 'gege',
//       lastname: 'gege',
//       othername: 'kiriza',
//       email: 'gege@gmail.com',
//       phoneNumber: '0724343444',
//       username: 'gege',
//       password: 'gege123',

//     };
//     chai.request(index)
//       .post('/api/v1/auth/signup')
//       .send(newUser)
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.should.be.json;
//         res.body.should.be.a('object');
//         res.body.should.have.property('user');
//         res.body.user.should.have.property('id');
//         res.body.user.should.have.property('firstname');
//         res.body.user.should.have.property('lastname');
//         res.body.user.should.have.property('othername');
//         res.body.user.should.have.property('email');
//         res.body.user.should.have.property('phoneNumber');
//         res.body.user.should.have.property('username');
//         res.body.user.should.have.property('registered');
//         id = res.body.user.id;
//         done();
//       });
//   });
// });
