const jwt = require('jsonwebtoken')
require('dotenv').config();
const SECRET = process.env.SECRET;

function verifyJwt(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send(err)
        }
        req.usuarioCpf = decoded.usuarioCpf
        next();
    })
}

//FIX: fazer Refresh token
//FIX: fazer logout
//FIX: usar cookies 

module.exports = verifyJwt