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
        payment_method: { 
            type: type.ENUM('cash', 'card'),
            defaultValue: 'cash'
        },
        createdAt:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP(3)'),
            allowNull: true
        },
        updatedAt:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP(3)'),
            allowNull: true
        }
    });
    return Model;
};