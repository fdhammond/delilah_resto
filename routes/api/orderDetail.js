const router = require('express').Router();
const { OrderDetail } = require('../../database/database');



router.post('/orderDetails', async (req, res) => {
    const orderDetails = await OrderDetail.create({
        order: order_id,
        
    });

    res.json(orderDetails)
})








module.exports = router;