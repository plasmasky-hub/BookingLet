module.exports = (req, res, next) => {

    if( !req.body.user || !req.body.user.role ){
        return res.sendStatus(401);
    }
    if( req.body.user.role !== 'Admin' ){
        return res.sendStatus(401);
    }

    console.log('Role check passed!');

    return next();
}