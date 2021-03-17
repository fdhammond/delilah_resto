module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           autoIncrement: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING(10),
        address: DataTypes.STRING,
        password: DataTypes.STRING(150),
        isAdmin: {
            type: DataTypes.ENUM('admin', 'user'),
            defaultValue: 'user'
        }
    });
}