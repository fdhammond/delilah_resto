const router = require('express').Router();
const sequelize = require('../../database/database');
const { Order } = require('../../database/database');
const { OrderDetail } = require('../../database/database');
const { Menu } = require('../../database/database');
const orderDetails = require('../../models/orderDetails');


router.get('/:id', async (req, res) => {
    const order = await Order.findAll({ where: { id: req.params.id} } );

    const newOrderDetail = await Menu.findAll({
        attributes: ['name', 'price']
      });
    
    res.json({
        order: {
            status: order.status,
            user: order.user_id,
            menu: newOrderDetail
        }
    });
});

router.post('/newOrder', async (req, res) => {
    let menu = req.body.order.menu;
    const order = await Order.create({
        payment_method: req.body.order.payment_method,
        user_id: req.body.order.user_id        
    });
    menu.forEach( async (element) => {
        await OrderDetail.create({
            order_id: order.id,
            menu_id: element.id
        })
    });

    res.json(order);
});

router.delete('/deleteOrder/:id', async (req, res) => {
    const order = await Order.destroy( { where: { state: 'cancel', id: req.params.id } } );
    res.json(order);
})

module.exports = router;