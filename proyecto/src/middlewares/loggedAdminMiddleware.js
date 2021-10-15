function loggedAdminMiddleware(req, res, next) {
    if (!req.session.userLog) {
        return res.redirect('/user/login');
    } else if (req.session.userLog.role_id != 1) {
        return res.redirect('/');
    }
    next();

}

module.exports = loggedAdminMiddleware;