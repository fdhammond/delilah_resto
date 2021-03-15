const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { User } = require('../../database/database');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');



router.post('/register', [
    check('name', 'El nombre de usuario es obligatorio').not().isEmpty().isAlphanumeric().trim(),
    check('password', 'El password es obligatorio, debe tener minimo 8 caracteres').not().isEmpty().isLength({ min: 8 }),
    check('email', 'El email debe estar correcto').isEmail()
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        //Devuelve el error en formato array
        return res.status(422).json({ errores: errors.array() });
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);    
    const user = await User.create(req.body);
    res.json(user);
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email} });
    if (user) {
        //Comparo password que viene en el body y la encriptada
        const equals = bcrypt.compareSync(req.body.password, user.password)
        if (equals) {
            //console.log(user.dataValues)
            res.json({ success: createToken(user) });
        } else {
            res.json({ error: 'Error in user or password' })
        }
    } else {
        res.json({ error: 'Error in user or password' })
    }
});


const createToken = (user) => {
    const payload = {
        usuarioId: user
    }

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 1440 });
}

module.exports = router;