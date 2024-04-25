const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// http://localhost:3001/thoughts
router.use('/thoughts', thoughtRoutes);
// http://localhost:3001/users
router.use('/users', userRoutes);

module.exports = router;
