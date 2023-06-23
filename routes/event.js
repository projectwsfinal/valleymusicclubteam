const routes = require('express').Router();
const events = require('../controllers/event');

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

routes.get('/', requiresAuth(), events.getAllEvents);
routes.get('/:_id', requiresAuth(), events.getEvent);

routes.post('/', validation.validateEvent, events.createEvent);
routes.put('/:_id', validation.validateEvent, events.updateEvent);

routes.delete('/:_id', events.deleteEvent);

module.exports = routes;