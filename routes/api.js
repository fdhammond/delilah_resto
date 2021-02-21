const router = require('express').Router();

const apiUserRouter = require('./api/user');
const apiMenuRouter = require('./api/menu');

router.use('/user', apiUserRouter);
router.use('/menu', apiMenuRouter);


module.exports = router;