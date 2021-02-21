module.exports = (sequelize, type) => {
    return sequelize.define('menu', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        price: type.INTEGER
    });
}