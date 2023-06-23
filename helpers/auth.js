const routes = require('express').Router();
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

module.exports = { auth, requiresAuth };