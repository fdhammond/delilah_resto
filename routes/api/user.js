const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { User } = require('../../database/database');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');

router.post('/register', [
    check('name', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
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
    const user = await User.findOne({ where: { email: req.body.email, password: req.body.password, name: req.body.name } });
    if (user) {
        //Comparo password que viene en el body y la encriptada
        const equals = bcrypt.compareSync(req.body.password, user.password)
        if (equals) {
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
        usuarioId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, 'minutes').unix()
    }

    return jwt.encode(payload, 'frase secreta');
}

module.exports = router;