const routes = require('express').Router();
const students = require('../controllers/student');

const config = require('../config/config');

const { auth } = require('express-openid-connect');
routes.use(auth(config));

const { requiresAuth } = require('express-openid-connect');

const validation = require('../middleware/validate');

routes.get('/', requiresAuth(), students.getAllStudents);
routes.get('/:_id', requiresAuth(), students.getStudent);

routes.post('/', validation.validateStudent, students.createStudent);
routes.put('/:_id', validation.validateStudent, students.updateStudent);

routes.delete('/:_id', students.deleteStudent);

module.exports = routes;