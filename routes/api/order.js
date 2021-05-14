const router = require('express').Router();
const sequelize = require('../../database/database');
const { isAdminUser, authenticateToken } = require('../api/middlewares');
const { Order } = require('../../database/database');
const { OrderDetail } = require('../../database/database');
const { Menu } = require('../../database/database');
const orderDetails = require('../../models/orderDetails');




router.get('/:id', async (req, res) => {
    const order = await Order.findAll({ where: { id: req.params.id } } );

    const newOrderDetail = await OrderDetail.findAll({
        attributes: ['menu_id', 'quantity'],
        where: {
            order_id: req.params.id            
        }
      });
      
      const detailMenu = await Menu.findAll({
        attributes:  {
            include: ['name', 'price'],
            exclude: ['description', 'createdAt', 'updatedAt']  
        },
        include: [
            {
              model: OrderDetail,
              attributes: {
                include: ['quantity'],
                exclude: ['id', 'createdAt', 'updatedAt', 'menu_id', 'order_id']
              }, 
              where: { 
                  order_id: req.params.id                                                                     
              },
            },
          ],
      })

    res.json({
        
        order: {
            details: order,            
            menus: detailMenu
        }
    });
});

router.post('/newOrder', authenticateToken, async (req, res) => {
    let menu = req.body.order.menu;
    console.log(req.user)
    
    const order = await Order.create({
        payment_method: req.body.payment_method,
        user_id: req.user.usuarioId.id       
        
    });
    menu.forEach( async (element) => {
         await OrderDetail.create({
             order_id: order.id,
             menu_id: element.id,
             quantity: element.quantity
         })
     });
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