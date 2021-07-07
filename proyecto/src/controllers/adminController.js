const adminController = {

    admin: function (req, res) {
        res.render('admin/products-admin');
    }, 
    edit: function (req, res) {
        res.render('admin/edit-product');
    },
    add: function (req, res) {
        res.render('admin/add-product');
    }

};

module.exports = adminController;