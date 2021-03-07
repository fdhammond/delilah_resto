const router = require('express').Router();
const { Menu } = require('../../database/database');
const jsonWebToken = require('jsonwebtoken');
const { isAdminUser } = require('../api/middlewares');


router.get('/menu', async (req, res) => {
    const menu = await Menu.findAll();
    res.json(menu);
});

router.post('/newMenu', isAdminUser, async (req, res) => {
    const menu = await Menu.create(req.body)
    res.json(menu);
});

router.delete('/newMenu/:id', isAdminUser, async (req, res) => {
    
    const menu = await Menu.destroy( 
        {  
            where: { 
                id: req.params.id
            }
        }
    );

    res.json(menu);
});

module.exports = router;