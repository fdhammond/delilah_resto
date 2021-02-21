const router = require('express').Router();
const { Menu } = require('../../database/database');

router.get('/:id', async (req, res) => {
    const menu = await Menu.findAll({
        where: {
            id: req.params.id
        }
    });
    res.json(menu);
});

module.exports = router;