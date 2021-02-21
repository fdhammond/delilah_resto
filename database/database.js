const Sequelize = require('sequelize');

const UserModel = require('../models/users');
const MenuModel = require('../models/menus');

const sequelize = new Sequelize('delilah_resto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);
const Menu = MenuModel(sequelize, Sequelize);


sequelize.sync({ force: false })
.then(() => {
    console.log('Sync Tables')
});

module.exports = {
    User,
    Menu
}