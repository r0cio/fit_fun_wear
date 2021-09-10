module.exports = function(sequelize, dataTypes){
    let alias = "Product";
    let cols = {
        id_product: {
            type:  dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        model: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }

    let config = {
        tableName: "products",
        timestamps: true
    }

    let Product = sequelize.define(alias, cols, config);


    return Product;
}