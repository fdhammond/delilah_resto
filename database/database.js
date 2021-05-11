const Sequelize = require('sequelize');
const UserModel = require('../models/users');
const MenuModel = require('../models/menus');
const OrderModel = require('../models/orders');
const OrderDetailModel = require('../models/orderDetails');


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
const OrderDetail = OrderDetailModel(sequelize, Sequelize);



User.hasMany(Order, { foreignKey: "user_id"});
Menu.hasMany(OrderDetail, { foreignKey: "menu_id"});
Order.hasMany(OrderDetail, { foreignKey: "order_id"});


sequelize.sync({ force: false })
.then(() => {
    console.log('Sync Tables')
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
    User,
    Menu,
    Order,
    OrderDetail,
    sequelize    
}
