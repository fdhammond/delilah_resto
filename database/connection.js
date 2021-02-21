const Sequelize = require('sequelize');

const dialect = "mysql";
const user = "root";
const host = "localhost";
const port = 3306;
const dbname = "delilah_resto_v1";
const connection_string = `${dialect}://${user}@${host}:${port}/${dbname}`; 
const sequelize = new Sequelize(connection_string);

sequelize.authenticate().then(() => {
    console.log("Connected");
}).catch(err => {
    console.log(err);
});

module.exports = sequelize;