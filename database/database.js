const Sequelize = require('sequelize');

const UserModel = require('../models/users');

const sequelize = new Sequelize('delilah_resto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false })
.then(() => {
    console.log('Sync Tables')
});

module.exports = {
    User
}