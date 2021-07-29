// ************ Express validator Require ************
const {validationResult} = require("express-validator");

const userController = {

    login: function (req, res) {
        res.render('user/login');
    },

    register: function (req, res) {
        res.render('user/register');
    },

    store: function (req, res) {
		// Se obtienen las validaciones de los campos del formulario
        
		const resultValidation = validationResult(req);

		if( resultValidation.errors.length > 0){
			return res.render('user/register', {
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		} else {
			let user = req.body;
            /*
			req.session.user = user;
			req.session.name = user.fullName;
            */
			res.render("user/register");
		}

    },

    resetPassword: function (req, res) {
        res.render('user/reset-password');
    }

};

module.exports = userController;