'use strict';

const { Router } = require('express');
const router = Router();

// Import custom middleware that stops unauthenticated users
// from visiting a route meant for authenticated users only
const routeGuard = require('./../middleware/route-guard');
const authPages = require('./auth');
const profilePages = require('./profile');

// Routes
// use /routes/auth for all /auth endpoints
router.use('/auth', authPages);
// use /routes/profile for all /profile endpoints
router.use('/profile', profilePages);

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/main', routeGuard, (req, res, next) => {
  res.render('main')
})

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private')
})



module.exports = router;
