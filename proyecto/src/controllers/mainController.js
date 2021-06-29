const mainController = {

    index: function (req, res) {
        res.render('main/index');
    },

    privacidad: function (req, res) {
        res.render('main/privacidad');
    },

    legal: function (req, res) {
        res.render('main/legal');
    },

    terminos: function (req, res) {
        res.render('main/terminos');
    }

};

module.exports = mainController;