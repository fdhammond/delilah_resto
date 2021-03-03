module.exports = (sequelize, type) => {
    const Model = sequelize.define('order', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        state: {
            type: type.ENUM('new','confirm', 'cancel', 'delivered'),
            defaultValue: 'new'
        },
        payment_method: type.ENUM('cash', 'card'),
        createdAt:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP(3)'),
            allowNull: false
        },
        updatedAt:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP(3)'),
            allowNull: false
        }
    });
    return Model;
};