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
      console.log(order)
    res.json({
        /*
        order: {
            status: order.state,
            user: order.user_id,
            menu: menuPrueba
        }
        */
       order
    });
});

router.post('/newOrder', authenticateToken, async (req, res) => {
    //let menu = req.body.order.menu;

    const order = await Order.create({
        payment_method: req.body.payment_method,
        user_id: req.user.usuarioId.id        
    });
    // menu.forEach( async (element) => {
    //     await OrderDetail.create({
    //         order_id: order.id,
    //         menu_id: element.id
    //     })
    // });

    res.json(order);
});

router.put('/:id', isAdminUser, async (req, res) => {
    const order = await Order.update( 
        {  
            state: req.body.state,
            payment_method: req.body.payment_method
        },
        { where: { id: req.params.id } }
    );
    res.json(order);
});

router.delete('/deleteOrder/:id', isAdminUser, async (req, res) => {
     const order = await Order.destroy( { where: {  id: req.params.id  }} );        
    // console.log(order)
    // //const answer = order ? res.json({success: 'Order has been deleted'}) : res.json({error: 'Order not found.'});

    //  if (order) {
    //       res.json({success: 'Order has been deleted'})
    //  } else {
    //      res.json({error: 'Order not found.'});
    //  }
     
    // res.json(order)
    // if (!order) {
    //     res.json('err')
    // } else {
    //     order.destroy();
    //     res.json(order);
    // }
    res.json(order)
})

module.exports = router;