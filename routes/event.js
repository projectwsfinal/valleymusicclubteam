const routes = require('express').Router();
const events = require('../controllers/event');

const config = require('../config/config');

const { auth } = require('express-openid-connect');
routes.use(auth(config));

const { requiresAuth } = require('express-openid-connect');

const validation = require('../middleware/validate');

routes.get('/', requiresAuth(), events.getAllEvents);
routes.get('/:_id', requiresAuth(), events.getEvent);

routes.post('/', validation.validateEvent, events.createEvent);
routes.put('/:_id', validation.validateEvent, events.updateEvent);

routes.delete('/:_id', events.deleteEvent);

module.exports = routes;