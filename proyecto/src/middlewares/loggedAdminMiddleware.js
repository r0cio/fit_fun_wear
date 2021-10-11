function loggedAdminMiddleware(req, res, next) {
    if (!req.session.userLog) {
        return res.redirect('/user/login');
    }
    next();

}

module.exports = loggedAdminMiddleware;