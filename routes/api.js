const router = require('express').Router();

const apiMenusRouter = require('./api/user');

router.use('/user', apiMenusRouter);

module.exports = router;