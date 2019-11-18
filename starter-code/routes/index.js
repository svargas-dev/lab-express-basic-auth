'use strict';

const { Router } = require('express');
const router = Router();

const authPages = require('./auth');

// Routes
// use /routes/auth for all /auth endpoints
router.use('/auth', authPages);

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

// Import custom middleware that stops unauthenticated users
// from visiting a route meant for authenticated users only
const routeGuard = require('./../middleware/route-guard');

router.get('/main', routeGuard, (req, res, next) => {
  res.render('main')
})

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private')
})

module.exports = router;
