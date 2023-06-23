const routes = require('express').Router();
const instruments = require('../controllers/instrument');

const config = require('../config/config');

const { auth } = require('express-openid-connect');
routes.use(auth(config));

const { requiresAuth } = require('express-openid-connect');

const validation = require('../middleware/validate');

routes.get('/', requiresAuth(), instruments.getAllInstruments);
routes.get('/:_id', requiresAuth(), instruments.getInstrument);

routes.post('/', validation.validateInstrument, instruments.createInstrument);
routes.put('/:_id', validation.validateInstrument, instruments.updateInstrument);

routes.delete('/:_id', instruments.deleteInstrument);

module.exports = routes;