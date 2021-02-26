const Sequelize = require('sequelize');

const UserModel = require('../models/users');
const MenuModel = require('../models/menus');
const OrderModel = require('../models/orders');

//VER VARIABLES DE ENTORNO ACA.
const sequelize = new Sequelize('delilah_resto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        useUTC: true, 
    },
    timezone: '+02:00', 
    pool: {
        max: 10,
        min: 0,
        idle: 10000,
    },
});

const User = UserModel(sequelize, Sequelize);
const Menu = MenuModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);


sequelize.sync({ force: false })
.then(() => {
    console.log('Sync Tables')
});

module.exports = {
    User,
    Menu,
    Order
}