module.exports = (sequelize, type) => {
    const Model = sequelize.define('order', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        state: type.ENUM('confirm', 'cancel', 'delivered'),
        user: type.INTEGER,
        payment_method: type.ENUM('cash', 'card'),
        menu_id: type.INTEGER,
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
    return Model
};