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


module.exports = router;
