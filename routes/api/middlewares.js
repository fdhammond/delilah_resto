const jsonWebToken = require('jsonwebtoken');

function isAdminUser(req, res, next) {     
    const token = req.headers.authorization.split(' ')[1];

    const tokenVerify = jsonWebToken.verify(token, process.env.SECRET_KEY);

    if (tokenVerify.usuarioId.isAdmin != 'admin') {
        return res.status(403).send('Access denied, you dont have permission.');
    }
    next(); 
}


module.exports = {
    isAdminUser
}