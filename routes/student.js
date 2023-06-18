const routes = require('express').Router();
const students = require('../controllers/student');

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
}

routes.use(auth(config));

const { requiresAuth } = require('express-openid-connect');

const validation = require('../middleware/validate');

routes.get('/', requiresAuth(), students.getAllStudents);
routes.get('/:_id', requiresAuth(), students.getStudent);

routes.post('/', validation.validateStudent, students.createStudent);
routes.put('/:_id', validation.validateStudent, students.updateStudent);

routes.delete('/:_id', students.deleteStudent);

module.exports = routes;