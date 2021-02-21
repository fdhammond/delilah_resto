const router = require('express').Router();
const { Menu } = require('../../database/database');

router.post('/add', async (req, res) => {
    const menu = await Menu.create(req.body);
    res.json(menu);
});

module.exports = router;