const routes = require('express').Router();
const users = require('../controllers/user');

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

routes.get('/', requiresAuth(), users.getAllUsers);
routes.get('/:_id', requiresAuth(), users.getUser);

routes.post('/', validation.validateUser, users.createUser);
routes.put('/:_id', validation.validateUser, users.updateUser);

routes.delete('/:_id', users.deleteUser);

module.exports = routes;