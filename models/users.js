module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
           type: type.INTEGER,
           primaryKey: true,
           autoIncrement: true
        },
        name: type.STRING,
        email: type.STRING,
        phone: type.INTEGER,
        adress: type.STRING,
        password: type.STRING(150)
    });
}