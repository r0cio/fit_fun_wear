function loggedMiddleware(req, res, next) {
    if (!req.session.userLog) {
        return res.redirect('/');
    }
    next();

}

module.exports = loggedMiddleware;