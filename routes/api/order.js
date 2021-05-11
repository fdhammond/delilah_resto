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
      /*
      const menuPrueba = newOrderDetail.map( (element) => {
        return { 
            nombre: element.dataValues.name,
            price: element.dataValues.price,           
            quantity: element.dataValues.quantity
        }
      });
      */
      
//SELECT name FROM menus INNER JOIN orderdetails ON orderdetails.order_id = 2 AND menus.id = menu_id 

      const detailMenu = await Menu.findAll({
        attributes: ['name', 'price'],
        include: [
            {
              model: OrderDetail,    
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
        
       //order
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
     
    //  console.log(order)
    //  console.log(menu)
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