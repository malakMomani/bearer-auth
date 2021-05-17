'use strict';

const User = require('../models/users-model.js');

module.exports = async (req,res,next) =>{

  if (!req.headers.authorization) {
    next('Not Logged-in user');
} else {
    // get the token from headers
    try {
        // console.log(req.headers.auth-token);
        let token = req.headers.authorization.split(' ').pop();
        let user = await User.authenticateToken(token);
        if (user) {
            req.user = user;
            next();
        } else {
            next('Invalid Token');
        }

    } catch(ex) {
        console.log('ERROR: ', ex);
        res.status(403).send('Invalid Token error');

    }
}
}