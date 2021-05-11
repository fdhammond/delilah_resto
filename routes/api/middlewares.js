const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function isAdminUser(req, res, next) {     
    const token = req.headers.authorization.split(' ')[1];

    const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);

    if (tokenVerify.usuarioId.isAdmin != 'admin') {
        return res.status(403).send('Access denied, you dont have permission.');
    }
    next(); 
}


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }


module.exports = {
    isAdminUser,
    authenticateToken
}