function guestMiddleware(req, res, next) {
    if (req.session.userLog) {
        return res.redirect('/');
    }
    next();

}

module.exports = guestMiddleware;