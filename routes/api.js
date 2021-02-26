const router = require('express').Router();

const apiUserRouter = require('./api/user');
const apiMenuRouter = require('./api/menu');
const apiOrderRouter = require('./api/order');

router.use('/user', apiUserRouter);
router.use('/menu', apiMenuRouter);
router.use('/order', apiOrderRouter);


module.exports = router;