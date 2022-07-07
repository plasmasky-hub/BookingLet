const jwt = require('jsonwebtoken');

const { JWT_KEY } = process.env;

function generateToken(payload) {
    return jwt.sign(payload, JWT_KEY, {expiresIn: 60000});
}

module.exports = { generateToken };