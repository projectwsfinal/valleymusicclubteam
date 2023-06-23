const routes = require('express').Router();

const config = require('../config/config');

const { auth } = require('express-openid-connect');
routes.use(auth(config));

const { requiresAuth } = require('express-openid-connect');

routes.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

routes.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = routes;