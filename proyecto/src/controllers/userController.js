const userController = {

    login: function (req, res) {
        res.render('user/login');
    },

    register: function (req, res) {
        res.render('user/register');
    },

    resetPassword: function (req, res) {
        res.render('user/resetPassword');
    }

};

module.exports = userController;