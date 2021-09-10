module.exports = function(sequelize, dataTypes){
    let alias = "Category";
    let cols = {
        id_category: {
            type:  dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }

    let config = {
        tableName: "categories",
        timestamps: true
    }

    let Category = sequelize.define(alias, cols, config);


    return Category;
}