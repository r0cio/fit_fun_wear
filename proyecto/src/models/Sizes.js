module.exports = function(sequelize, dataTypes){
    let alias = "Size";
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
        tableName: "sizes",
        timestamps: false
    }

    let Size = sequelize.define(alias, cols, config);


    return Size;
}