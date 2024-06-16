
const app = require('express').Router();
const fileRoutes = require('./file.routes');
const authRoutes = require('./auth.routes')

app.use([fileRoutes,authRoutes]);

module.exports = app;
