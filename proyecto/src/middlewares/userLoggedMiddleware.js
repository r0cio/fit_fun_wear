const db = require("../database/models");
const user = require("../models/User");

function userLoggedMiddleware(req, res, next) {
    res.locals.isLog = false;

    if (req.cookies.userEmail) {
        //req.session.userLog = user.findByField("email", req.cookies.userEmail);
        db.User.findAll({
            where: {
                email: req.cookies.userEmail
            }
        })
            .then(user => {
                //console.log("userLoggedMid", user);
                user2 = user[0]
                req.session.userLog = user2;
                /* if (user.length != 0) {
                    user2 = user[0]
                    req.session.userLog = user2;
                } else {
                    req.session.userLog = undefined;
                } */
            })
    }
    if (req.session && req.session.userLog) {
        res.locals.isLog = true;
        res.locals.userLog = req.session.userLog;
    }
    next();
}

module.exports = userLoggedMiddleware;