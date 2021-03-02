module.exports = (sequelize, type) => {
    return sequelize.define('orderDetail', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
}