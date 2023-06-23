const routes = require('express').Router();
const users = require('../controllers/user');

const config = require('../config/config');

const { auth } = require('express-openid-connect');
routes.use(auth(config));

const { requiresAuth } = require('express-openid-connect');

const validation = require('../middleware/validate');

routes.get('/', requiresAuth(), users.getAllUsers);
routes.get('/:_id', requiresAuth(), users.getUser);

routes.post('/', validation.validateUser, users.createUser);
routes.put('/:_id', validation.validateUser, users.updateUser);

routes.delete('/:_id', users.deleteUser);

module.exports = routes;