require('dotenv').config();

const sequelize = require('./database/database');


//Es un objeto sequelize = new Sequelize;
/*
sequelize.query("SELECT * FROM details").then( res => {
    console.log(res);
});
*/

const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rate_limit = require('express-rate-limit');
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('./database/database');

const privateKey = process.env.SECRET_KEY;
const apiRouter = require('./routes/api');


const PORT = process.env.PORT || 3000;
const app = express();

const limiter = rate_limit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 50 //2 req
});

const logRequest = (req, res, next) => {
    console.log('Request Type', req.method)
    next();
}

app.use(helmet());
app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());


app.use(limiter);
app.use(logRequest);
app.use('/', apiRouter);






app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});