const { validateToken } = require("../utils/jwt")

module.exports = (req, res, next) => {
    // 1. Get bearer from Auth header
    // 2. Check if it's bearer
    // 3. Check token validation

    const authHeader = req.header('Authorization');

    if( !authHeader ){
        return res.sendStatus(401);
    }

    const tokenArray = authHeader.split(' ');
    if( tokenArray.length !== 2 || tokenArray[0] !== 'Bearer' ){
        return res.sendStatus(401);
    }

    const payload = validateToken(tokenArray[1]);

    if( !payload ){
        return res.sendStatus(401);
    }

    console.log('Auth check passed!');

    return next();
}