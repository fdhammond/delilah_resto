const router = require('express').Router();
const { Order } = require('../../database/database');
const { Menu } = require('../api/menu');

router.get('/:id', async (req, res) => {
    const order = await Order.findAll({ where: { id: req.params.id} } );
    res.json(order);
});

router.post('/newOrder', async (req, res) => {
    const order = await Order.create(req.body);
    res.json(order);
});

router.delete('/deleteOrder', async (req, res) => {
    const order = await Order.findAll( { where: { state: 'cancel'} } );
})

module.exports = router;