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
    /*
    Menu.bulkCreate([{
        name: 'Bagel de Salmón',
        price: 425
    },
    {
        name: 'Hamburguesa Clásica',
        price: 350
    },
    {
        name: 'Sandwich Veggie',
        price: 310
    },
    {
        name: 'Ensalada Veggie',
        price: 340
    },
    {
        name: 'Focaccia',
        price: 300
    },
    {
        name: 'Sandwich Focaccia',
        price: 440
    },
    {
        name: 'Veggie Avocado',
        price: 310
    }
]);
*/
