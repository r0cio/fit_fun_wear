const user = require("../models/User");

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    if(req.cookies.userEmail){
        res.session.userLogged = user.findByField("email",req.cookies.userEmail);
    }
    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;                            
    }
    next();
}

module.exports = userLoggedMiddleware;