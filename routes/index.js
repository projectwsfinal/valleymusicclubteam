const routes = require('express').Router();
const user = require('./user');
const student = require('./student');
const event = require('./event');
const auth = require('./auth');

routes.use('/users', user);
routes.use('/students', student);
routes.use('/events', event);
routes.use('/auth', auth);
routes.use('/', require('./swagger'));
// routes.use(
//     '/',
//     (docData = (req, res) => {
//         let docData = {
//             documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
//         };
//         res.send(docData);
//     })
// );

module.exports = routes;

// const routes = require('express').Router();
// const myController = require('../controllers')

// routes.get('/', myController.awesomeFunction);
// routes.get('/awesome', myController.returnAnotherPerson)

// module.exports = routes;