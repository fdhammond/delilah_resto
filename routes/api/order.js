const router = require('express').Router();
const sequelize = require('../../database/database');
const { isAdminUser, authenticateToken } = require('../api/middlewares');
const { Order } = require('../../database/database');
const { OrderDetail } = require('../../database/database');
const { Menu } = require('../../database/database');
const orderDetails = require('../../models/orderDetails');




router.get('/:id', async (req, res) => {
    const order = await Order.findAll({ where: { id: req.params.id} } );

    const newOrderDetail = await Menu.findAll({
        attributes: ['name', 'price'],
        include: [
            {
              model: OrderDetail,    
              as: 'menuId',
              where: { 
                  order_id: req.params.id                                                                         
              },
            },
          ],
      });
      console.log(newOrderDetail);
      
      let menuPrueba = newOrderDetail.map( (element) => {
        return { 
            nombre: element.dataValues.name,
            price: element.dataValues.price 
        }
      });

     console.log(menuPrueba);
    
    res.json({
        order: {
            status: order.status,
            user: order.user_id,
            menu: newOrderDetail
        }
    });
});

router.post('/newOrder', authenticateToken, async (req, res) => {
    let menu = req.body.order.menu;

    const order = await Order.create({
        payment_method: req.body.order.payment_method,
        user_id: req.user.usuarioId.id        
    });
    menu.forEach( async (element) => {
        await OrderDetail.create({
            order_id: order.id,
            menu_id: element.id
        })
    });

    res.json(order);
});

router.delete('/deleteOrder/:id', isAdminUser, async (req, res) => {
    const order = await Order.destroy( { where: { id: req.params.id } } );         
    const answer = order ? res.json({success: 'Order has been deleted'}) :  res.json({error: 'Order not found.'});
})

module.exports = router;